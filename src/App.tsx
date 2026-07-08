import React from 'react';
import Navbar from './components/Navbar';
import SpotlightHero from './components/SpotlightHero';
import ServicesSection from './components/ServicesSection';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import { ArrowUpRight } from 'lucide-react';

export default function App() {
  const handleStartExploring = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans tracking-tight antialiased">

      {/* ── Navigation ── */}
      <Navbar />

      {/* ── Hero (Home) ── */}
      <SpotlightHero onStartExploring={handleStartExploring} />

      {/* ── Our Services ── */}
      <ServicesSection />

      {/* ── About Us ── */}
      <AboutSection />

      {/* ── Contacts ── */}
      <ContactSection />

      {/* ── Footer ── */}
      <footer className="w-full bg-white border-t border-stone-200 py-16 px-4 sm:px-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-200">

            {/* Logo & tagline */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-stone-950">
                <svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
                </svg>
                <span className="text-stone-950 text-xl font-playfair italic font-bold">Vistanex</span>
              </div>
              <p className="text-stone-600 leading-relaxed pr-4 font-medium">
                Pioneering real estate development and construction in Bangladesh, focused on sustainable, modern, and iconic engineering-driven buildings.
              </p>
            </div>

            {/* Quick links */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-stone-800 font-bold uppercase tracking-wider">Navigation</span>
              <ul className="space-y-2 font-mono font-medium">
                {[
                  { label: 'Home', id: 'hero' },
                  { label: 'Our Services', id: 'services' },
                  { label: 'About Us', id: 'about' },
                  { label: 'Contacts', id: 'contacts' },
                ].map((item) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="hover:text-stone-950 text-stone-600 transition-colors cursor-pointer"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Regulatory */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-stone-800 font-bold uppercase tracking-wider">Governance</span>
              <ul className="space-y-2 text-stone-600 font-medium">
                <li>Bangladesh Building Code (BNBC) Compliant</li>
                <li>Tritech HVAC Engineering Certified</li>
                <li>Green Building LEED Frameworks</li>
                <li>RAJUK Registered Developer</li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="flex flex-col gap-4">
              <span className="font-mono text-stone-800 font-bold uppercase tracking-wider">VHL Investor Bulletin</span>
              <p className="text-stone-600 leading-relaxed font-medium">
                Receive private bulletins on premium project rollouts, sustainable design releases, and property investment insights in Dhaka.
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="acquisition@invest.com"
                  className="w-full bg-stone-50 border border-stone-200 rounded-lg py-2.5 px-3.5 text-xs text-stone-800 focus:outline-none focus:border-orange-500 placeholder-stone-400 font-medium"
                />
                <button
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-colors cursor-pointer"
                  aria-label="Subscribe"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-mono font-semibold text-stone-500">
            <span>© 2026 Vistanex Holdings Ltd (VHL). All rights reserved.</span>
            <div className="flex gap-4">
              <span className="hover:text-stone-950 cursor-pointer transition-colors">PRIVACY POLICY</span>
              <span>•</span>
              <span className="hover:text-stone-950 cursor-pointer transition-colors">ENGINEERING STANDARDS</span>
              <span>•</span>
              <span className="hover:text-stone-950 cursor-pointer transition-colors">LEED RATINGS</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
