import React, { useState } from 'react';
import Navbar from './components/Navbar';
import SpotlightHero from './components/SpotlightHero';
import InteractiveMap from './components/InteractiveMap';
import PropertyGrid from './components/PropertyGrid';
import MortgageCalculator from './components/MortgageCalculator';
import ContactPortal from './components/ContactPortal';
import FavoritesPanel from './components/FavoritesPanel';
import { Property, TourBooking } from './types';
import { LUXURY_PROPERTIES } from './data';
import { Building2, ArrowUpRight } from 'lucide-react';

export default function App() {
  // Shared state managers
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(LUXURY_PROPERTIES[0]);
  const [savedIds, setSavedIds] = useState<string[]>(['prop-quartz']); // Pre-save Villa Quartz as a gorgeous onboarding demo!
  const [favoritesOpen, setFavoritesOpen] = useState(false);
  const [lastBooking, setLastBooking] = useState<TourBooking | null>(null);

  // Toggle favorite list
  const handleToggleSave = (id: string) => {
    setSavedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Sync selected property from catalog/map
  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
  };

  // Trigger tour scheduler directly for a property
  const handleOpenBookingFor = (property: Property) => {
    setSelectedProperty(property);
    const bookingElement = document.getElementById('booking');
    if (bookingElement) {
      bookingElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Trigger scrolling from hero CTA
  const handleStartExploring = () => {
    const mapElement = document.getElementById('map');
    if (mapElement) {
      mapElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-white text-stone-900 font-sans tracking-tight antialiased">
      {/* 1. Translucent Global Header */}
      <Navbar 
        favoritesCount={savedIds.length}
        onOpenFavorites={() => setFavoritesOpen(true)}
        onOpenContact={() => {
          const bookingElement = document.getElementById('booking');
          if (bookingElement) {
            bookingElement.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      />

      {/* 2. Full-Screen Spotlight Reveal Hero */}
      <SpotlightHero onStartExploring={handleStartExploring} />

      {/* Brand Intro Ribbon */}
      <div className="bg-stone-50 border-y border-stone-200 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-left">
            <Building2 className="w-5 h-5 text-orange-500" />
            <div>
              <div className="text-xs font-mono uppercase text-stone-500 font-bold">EXQUISITE CRAFTSMANSHIP</div>
              <div className="text-sm font-semibold text-stone-800">Sustainable, innovative, and engineering-driven premium infrastructure.</div>
            </div>
          </div>
          <div className="flex items-center gap-6 text-xs text-stone-500 font-mono font-bold">
            <span>● TRITECH HVAC TECH</span>
            <span>● SUSTAINABLE INFRASTRUCTURE</span>
            <span>● ECO-FRIENDLY REINFORCED</span>
          </div>
        </div>
      </div>

      {/* 3. Interactive Masterplan Section */}
      <InteractiveMap 
        selectedProperty={selectedProperty}
        onSelectProperty={handleSelectProperty}
      />

      {/* 4. Curated Catalogue Grid Section */}
      <PropertyGrid 
        selectedProperty={selectedProperty}
        onSelectProperty={handleSelectProperty}
        savedIds={savedIds}
        onToggleSave={handleToggleSave}
        onOpenBookingFor={handleOpenBookingFor}
      />

      {/* 5. Acquisition Mortgage Estimator Section */}
      <MortgageCalculator selectedProperty={selectedProperty} />

      {/* 6. Contact and Scheduling Section */}
      <ContactPortal 
        initialProperty={selectedProperty}
        onBookingSuccess={(booking) => {
          setLastBooking(booking);
          // Auto-save the booked property
          if (!savedIds.includes(booking.propertyId)) {
            setSavedIds((prev) => [...prev, booking.propertyId]);
          }
        }}
      />

      {/* 7. Client-Side Drawer Favorites Panel */}
      <FavoritesPanel 
        isOpen={favoritesOpen}
        onClose={() => setFavoritesOpen(false)}
        savedIds={savedIds}
        onToggleSave={handleToggleSave}
        onSelectProperty={handleSelectProperty}
      />

      {/* 8. Modern Footer */}
      <footer className="w-full bg-white border-t border-stone-200 py-16 px-4 sm:px-8 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-200">
            {/* Logo details */}
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

            {/* Quick sections */}
            <div className="flex flex-col gap-3">
              <span className="font-mono text-stone-800 font-bold uppercase tracking-wider">Developments</span>
              <ul className="space-y-2 font-mono font-medium">
                <li><a href="#hero" className="hover:text-stone-950 text-stone-600 transition-colors">Aura Residences</a></li>
                <li><a href="#map" className="hover:text-stone-950 text-stone-600 transition-colors">VHL Masterplan</a></li>
                <li><a href="#listings" className="hover:text-stone-950 text-stone-600 transition-colors">The VHL Collection</a></li>
                <li><a href="#calculator" className="hover:text-stone-950 text-stone-600 transition-colors">Acquisition Estimator</a></li>
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

            {/* Subscription newsletter */}
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
                <button className="absolute right-2.5 top-1/2 -translate-y-1/2 text-orange-500 hover:text-orange-600 transition-colors cursor-pointer" aria-label="Subscribe">
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
