import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home',        id: 'hero' },
  { label: 'Our Services',id: 'services' },
  { label: 'About Us',    id: 'about' },
  { label: 'Contacts',    id: 'contacts' },
];

export default function Navbar() {
  const [scrolled, setScrolled]         = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection]   = useState('hero');

  /* ── Scroll-spy: watch which section is in viewport ── */
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Walk sections in reverse so the topmost visible one wins
      const sectionIds = [...navItems].reverse().map((i) => i.id);
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 80) {
            setActiveSection(id);
            return;
          }
        }
      }
      setActiveSection('hero');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <nav
        id="app-navbar"
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-5 sm:px-8 transition-all duration-300 ${
          scrolled
            ? 'bg-white/92 border-b border-stone-200/80 backdrop-blur-md shadow-sm py-3 sm:py-3.5'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 sm:py-5'
        }`}
      >
        {/* Logo */}
        <div
          className={`flex items-center gap-3 cursor-pointer select-none ${
            scrolled ? 'text-stone-950' : 'text-white'
          }`}
          onClick={() => handleNavClick('hero')}
        >
          <svg width="26" height="26" viewBox="0 0 256 256" fill="currentColor"
            className="transition-transform duration-300 hover:rotate-12">
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-2xl font-playfair italic tracking-wider font-semibold">
            Vistanex
          </span>
        </div>

        {/* Desktop Center Pill Nav */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-stone-100/80 backdrop-blur-md border border-stone-200 rounded-full px-2 py-1.5 items-center gap-1 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-stone-950 text-white shadow-sm scale-105'
                    : 'text-stone-600 hover:bg-stone-200/65 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right: Inquire CTA + Mobile Hamburger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('contacts')}
            className={`hidden md:block text-sm font-semibold px-6 py-2.5 rounded-full hover:opacity-90 transition-all active:scale-95 shadow-xs cursor-pointer ${
              scrolled ? 'bg-stone-950 text-white' : 'bg-white text-stone-950'
            }`}
          >
            Inquire Now
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-800 hover:text-stone-950 bg-stone-100 rounded-full border border-stone-200 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-white/98 backdrop-blur-lg flex flex-col justify-between p-6 pt-24 md:hidden">
          <div className="flex flex-col gap-6 pt-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">
              Navigation
            </div>
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left text-3xl font-light tracking-tight transition-colors py-1 ${
                    isActive
                      ? 'text-stone-950 font-semibold font-playfair italic'
                      : 'text-stone-500 hover:text-stone-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-stone-200 pt-6">
            <button
              onClick={() => handleNavClick('contacts')}
              className="w-full bg-stone-950 text-white py-3.5 rounded-full font-semibold transition-colors text-center cursor-pointer"
            >
              Inquire Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
