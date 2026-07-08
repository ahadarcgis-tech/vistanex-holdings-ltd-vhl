import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

interface NavbarProps {
  favoritesCount: number;
  onOpenFavorites: () => void;
  onOpenContact: () => void;
}

export default function Navbar({ favoritesCount, onOpenFavorites, onOpenContact }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Curations');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Developments', id: 'hero' },
    { label: 'Masterplan', id: 'map' },
    { label: 'VHL Collection', id: 'listings' },
    { label: 'Acquisition Estimator', id: 'calculator' },
    { label: 'Inquire Now', id: 'booking' }
  ];

  const handleNavClick = (label: string, elementId: string) => {
    setActiveTab(label);
    setMobileMenuOpen(false);
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <nav 
        id="app-navbar"
        className={`fixed top-0 left-0 right-0 z-[100] flex items-center justify-between p-4 sm:p-5 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/90 border-b border-stone-200/80 backdrop-blur-md shadow-sm py-3 sm:py-4' 
            : 'bg-gradient-to-b from-white/80 via-white/20 to-transparent'
        }`}
      >
        {/* Left: Premium logo and wordmark in high-contrast Black */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none text-stone-950"
          onClick={() => handleNavClick('Developments', 'hero')}
        >
          <svg 
            width="26" 
            height="26" 
            viewBox="0 0 256 256" 
            fill="currentColor"
            className="transition-transform duration-300 hover:rotate-12"
          >
            <path d="M 256 256 L 128 256 L 0 128 L 128 128 Z M 256 128 L 128 128 L 0 0 L 128 0 Z" />
          </svg>
          <span className="text-stone-950 text-2xl font-playfair italic tracking-wider font-semibold">Vistanex</span>
        </div>

        {/* Center pill (hidden below md) styled for light/white theme */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 bg-stone-100/80 backdrop-blur-md border border-stone-200 rounded-full px-2 py-1.5 items-center gap-1 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeTab === item.label;
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item.label, item.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-stone-950 text-white font-semibold shadow-sm scale-105'
                    : 'text-stone-600 hover:bg-stone-200/65 hover:text-stone-900'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right Buttons: Saved listings counter + Premium Call to Action */}
        <div className="flex items-center gap-3">
          {/* Favorites Trigger button */}
          <button 
            onClick={onOpenFavorites}
            className="relative flex items-center gap-2 px-3 py-2 text-stone-800 hover:text-stone-950 bg-stone-100/90 hover:bg-stone-200/90 rounded-full border border-stone-200 transition-all text-xs sm:text-sm shadow-xs"
            title="Saved Properties"
          >
            <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-orange-500 text-orange-500 animate-pulse' : ''}`} />
            <span className="hidden sm:inline font-medium">Saved</span>
            {favoritesCount > 0 && (
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-500 text-[10px] font-bold text-white leading-none">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Desktop Call to Action */}
          <button 
            onClick={onOpenContact}
            className="hidden md:block bg-stone-950 text-white text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-stone-850 transition-all active:scale-95 shadow-xs cursor-pointer"
          >
            Inquire Now
          </button>

          {/* Mobile hamburger menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-stone-800 hover:text-stone-950 bg-stone-100 rounded-full border border-stone-200 transition-colors focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay styled in White and Black */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-white/98 backdrop-blur-lg flex flex-col justify-between p-6 pt-24 md:hidden animate-fade-in">
          <div className="flex flex-col gap-6 pt-4">
            <div className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-2">Navigation</div>
            {navItems.map((item) => {
              const isActive = activeTab === item.label;
              return (
                <button
                  key={item.label}
                  onClick={() => handleNavClick(item.label, item.id)}
                  className={`text-left text-3xl font-light tracking-tight transition-colors py-1 ${
                    isActive ? 'text-orange-500 font-semibold font-playfair italic' : 'text-stone-800 hover:text-stone-950'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 border-t border-stone-200 pt-6">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenFavorites();
              }}
              className="flex items-center justify-center gap-2 bg-stone-100 text-stone-800 py-3.5 rounded-full font-medium border border-stone-200"
            >
              <Heart className="w-5 h-5 text-orange-500 fill-orange-500" />
              Saved Properties ({favoritesCount})
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="bg-[#e8702a] text-white py-3.5 rounded-full font-semibold hover:bg-orange-600 transition-colors text-center cursor-pointer"
            >
              Contact VHL / Inquire Now
            </button>
          </div>
        </div>
      )}
    </>
  );
}
