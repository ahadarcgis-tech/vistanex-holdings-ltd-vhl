/**
 * auto-sync.mjs
 * Watches for file changes in the project and automatically
 * commits + pushes to GitHub (which triggers Netlify auto-deploy).
 *
 * Usage: npm run sync
 */

import { watch } from 'fs';
import { execSync } from 'child_process';
import { resolve, join } from 'path';

const ROOT = resolve('.');

// Directories and files to watch for changes
const WATCH_TARGETS = ['src', 'public', 'index.html', 'vite.config.ts', 'netlify.toml'];

// Debounce delay in ms — waits this long after last change before committing
const DEBOUNCE_MS = 3000;

let debounceTimer = null;
let pendingChanges = new Set();

function log(msg) {
  const time = new Date().toLocaleTimeString();
  console.log(`[${time}] ${msg}`);
}

function gitSync() {
  const files = [...pendingChanges].join(', ');
  pendingChanges.clear();

  try {
    // Stage all changes
    execSync('git add -A', { cwd: ROOT, stdio: 'pipe' });

    // Check if there's actually anything to commit
    const status = execSync('git status --porcelain', { cwd: ROOT }).toString().trim();
    if (!status) {
      log('⏭  No changes to commit.');
      return;
    }

    // Build a commit message with timestamp
    const timestamp = new Date().toLocaleString('en-GB', {
      day: '2-digit', month: 'short', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true,
    });
    const message = `Auto-sync: ${timestamp}`;

    execSync(`git commit -m "${message}"`, { cwd: ROOT, stdio: 'pipe' });
    log(`✅ Committed: "${message}"`);

    execSync('git push origin main', { cwd: ROOT, stdio: 'pipe' });
    log('🚀 Pushed to GitHub → Netlify deploy triggered!');
    log(`   Changed: ${files}`);
  } catch (err) {
    console.error('❌ Git sync failed:', err.message);
  }
}

function scheduleSync(filename) {
  pendingChanges.add(filename);
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(gitSync, DEBOUNCE_MS);
  log(`📝 Change detected: ${filename} — syncing in ${DEBOUNCE_MS / 1000}s...`);
}

// Start watching each target
for (const target of WATCH_TARGETS) {
  const fullPath = join(ROOT, target);
  try {
    watch(fullPath, { recursive: true }, (eventType, filename) => {
      if (!filename) return;
      // Ignore temp/build files
      if (filename.includes('node_modules') || filename.endsWith('.log')) return;
      scheduleSync(filename);
    });
    log(`👁  Watching: ${target}`);
  } catch {
    // Target may not exist yet — skip silently
  }
}

log('');
log('🔄 Auto-sync is ACTIVE — changes will auto-push to GitHub & Netlify.');
log('   Press Ctrl+C to stop.');
log('');
