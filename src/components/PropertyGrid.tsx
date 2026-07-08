import React, { useState } from 'react';
import { Property } from '../types';
import { LUXURY_PROPERTIES } from '../data';
import { Search, Heart, LayoutGrid, MapPin, Eye, Compass, Hammer, CalendarDays, X, Check } from 'lucide-react';

interface PropertyGridProps {
  onSelectProperty: (property: Property) => void;
  selectedProperty: Property | null;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onOpenBookingFor: (property: Property) => void;
}

export default function PropertyGrid({ 
  onSelectProperty, 
  selectedProperty, 
  savedIds, 
  onToggleSave,
  onOpenBookingFor
}: PropertyGridProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(8000000);
  const [activeQuickView, setActiveQuickView] = useState<Property | null>(null);

  // Property types available
  const propertyTypes = ['All', 'Villa', 'Penthouse', 'Estate', 'Pavilion', 'Mansion'];

  // Filter listings based on search inputs
  const filteredListings = LUXURY_PROPERTIES.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          listing.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          listing.architect.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = selectedType === 'All' || listing.type === selectedType;
    const matchesPrice = listing.price <= maxPrice;
    return matchesSearch && matchesType && matchesPrice;
  });

  return (
    <section id="listings" className="w-full bg-white text-stone-900 py-24 px-4 sm:px-8 border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-14">
          <span className="text-xs uppercase tracking-widest text-[#e8702a] font-mono font-bold">Curated Catalogue</span>
          <h2 className="text-4xl md:text-5xl font-playfair italic font-normal text-stone-950 mt-2">
            The VHL Collection
          </h2>
          <p className="text-stone-600 mt-3 max-w-xl text-sm leading-relaxed">
            A precise selection of sustainable luxury residences, engineered in synergy with advanced thermodynamics and structural resilience.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-5 mb-10 flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            {/* Search Input */}
            <div className="md:col-span-4 relative">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by name, landmark, or architect..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-stone-200 rounded-full py-3 pl-11 pr-5 text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:border-[#e8702a] transition-all shadow-xs"
              />
            </div>

            {/* Type Filters Button Row */}
            <div className="md:col-span-5 overflow-x-auto flex gap-1.5 py-1 scrollbar-none">
              {propertyTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
                    selectedType === type
                      ? 'bg-stone-950 text-white font-bold'
                      : 'bg-white text-stone-600 hover:text-stone-950 border border-stone-200 shadow-xs'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* Budget Limit Slider */}
            <div className="md:col-span-3 flex flex-col gap-1 px-2">
              <div className="flex justify-between items-center text-xs text-stone-500">
                <span className="font-mono font-bold">BUDGET CAPS</span>
                <span className="font-mono text-[#e8702a] font-extrabold">${(maxPrice / 1000000).toFixed(1)}M</span>
              </div>
              <input
                type="range"
                min="3000000"
                max="8000000"
                step="250000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#e8702a] bg-stone-200 h-1 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Listings Count */}
        <div className="mb-6 flex justify-between items-center text-xs text-stone-500 font-mono uppercase tracking-wider font-semibold">
          <span>SHOWING {filteredListings.length} OF {LUXURY_PROPERTIES.length} VHL PROJECTS</span>
          <span>CURRENCY: USD</span>
        </div>

        {/* Properties Grid */}
        {filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredListings.map((listing) => {
              const isSaved = savedIds.includes(listing.id);
              const isMapSelected = selectedProperty?.id === listing.id;

              return (
                <div 
                  key={listing.id}
                  onClick={() => onSelectProperty(listing)}
                  className={`bg-white border rounded-2xl overflow-hidden group cursor-pointer transition-all duration-300 flex flex-col justify-between ${
                    isMapSelected 
                      ? 'border-[#e8702a] ring-1 ring-[#e8702a]/40 shadow-md shadow-[#e8702a]/5' 
                      : 'border-stone-200 hover:border-stone-300 hover:shadow-md hover:translate-y-[-4px]'
                  }`}
                >
                  <div>
                    {/* Visual Card Top: Minimalist black blueprint layout placeholders, styled for light theme */}
                    <div className="aspect-[4/3] bg-stone-50 relative overflow-hidden flex items-center justify-center p-6 border-b border-stone-150 select-none">
                      {/* Subtle geometry background decoration */}
                      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-70" />

                      {/* Geometric Wireframe representing listing, looks extremely tech/luxury */}
                      <svg width="180" height="120" viewBox="0 0 180 120" fill="none" className="text-stone-300 group-hover:text-stone-400 transition-colors duration-500">
                        <rect x="10" y="20" width="160" height="80" stroke="currentColor" strokeWidth="1" />
                        <line x1="10" y1="60" x2="170" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
                        <circle cx="90" cy="60" r="30" stroke="currentColor" strokeWidth="0.5" />
                        <path d="M 40,30 L 90,15 L 140,30" stroke="currentColor" strokeWidth="1" />
                        <text x="20" y="90" fill="currentColor" fontSize="8" fontFamily="monospace" className="opacity-60">GRID: VHL_{listing.id.toUpperCase()}</text>
                      </svg>

                      {/* Header floating tags */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                        <span className="bg-white/90 backdrop-blur text-[10px] font-mono text-stone-700 px-2.5 py-1 rounded-md border border-stone-200 uppercase tracking-widest font-bold">
                          {listing.type}
                        </span>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleSave(listing.id);
                          }}
                          className="pointer-events-auto bg-white/90 backdrop-blur border border-stone-200 p-2 rounded-full text-stone-400 hover:text-stone-600 hover:bg-stone-50 transition-all shadow-xs"
                          title={isSaved ? "Remove from saved" : "Save Listing"}
                        >
                          <Heart className={`w-4 h-4 ${isSaved ? 'fill-orange-500 text-orange-500' : ''}`} />
                        </button>
                      </div>

                      {/* Quick view floating trigger button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveQuickView(listing);
                        }}
                        className="absolute bottom-4 right-4 bg-white/95 backdrop-blur border border-stone-200 px-3 py-1.5 rounded-lg text-[10px] font-mono text-stone-700 hover:text-stone-950 hover:bg-stone-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        QUICK VIEW
                      </button>

                      {/* Completed / Reserved badge */}
                      {listing.status !== 'Available' && (
                        <div className="absolute top-4 left-4 flex gap-1 pointer-events-none">
                          <span className={`text-[9px] font-mono uppercase px-2 py-0.5 rounded-md font-extrabold tracking-wider ${
                            listing.status === 'Reserved' 
                              ? 'bg-yellow-100 text-yellow-850 border border-yellow-200' 
                              : 'bg-orange-100 text-orange-800 border border-orange-200'
                          }`}>
                            {listing.status}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Listing card content details */}
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-playfair italic font-normal text-stone-900 group-hover:text-orange-500 transition-colors">
                            {listing.title}
                          </h3>
                          <p className="text-stone-500 text-xs mt-1 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-stone-400" />
                            {listing.location}
                          </p>
                        </div>
                        <div className="text-lg font-mono font-bold text-stone-900">
                          ${(listing.price / 1000000).toFixed(2)}M
                        </div>
                      </div>

                      <p className="text-stone-600 text-xs mt-4 line-clamp-2 leading-relaxed">
                        {listing.description}
                      </p>

                      {/* Card specifications row */}
                      <div className="grid grid-cols-3 gap-2 mt-5 py-3 border-t border-b border-stone-100 text-[11px] text-stone-500 font-mono font-medium">
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">AREA</span>
                          <span className="text-stone-800 mt-0.5 font-bold">{listing.sqft.toLocaleString()} sqft</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center border-l border-r border-stone-100">
                          <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">ROOMS</span>
                          <span className="text-stone-800 mt-0.5 font-bold">{listing.bedrooms}B / {listing.bathrooms}BA</span>
                        </div>
                        <div className="flex flex-col items-center justify-center text-center">
                          <span className="text-[9px] text-stone-400 uppercase tracking-widest font-bold">YEAR</span>
                          <span className="text-stone-800 mt-0.5 font-bold">{listing.yearBuilt}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2 flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveQuickView(listing);
                      }}
                      className="flex-1 bg-white border border-stone-200 hover:border-stone-300 text-stone-700 hover:text-stone-950 text-xs py-3 rounded-xl font-semibold transition-all text-center flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      Specs
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenBookingFor(listing);
                      }}
                      className="flex-1 bg-stone-950 group-hover:bg-[#e8702a] text-white text-xs py-3 rounded-xl font-bold transition-all text-center border border-transparent shadow-xs cursor-pointer"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl py-16 px-4 flex flex-col items-center justify-center text-center">
            <h4 className="text-lg font-bold text-stone-800">No curations match filters</h4>
            <p className="text-xs text-stone-500 mt-2 max-w-sm">
              Adjust your budget threshold or type filters to find available properties in the VHL Collection.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedType('All');
                setMaxPrice(8000000);
              }}
              className="mt-4 text-xs font-mono font-bold uppercase text-orange-500 hover:text-orange-600 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Property Quick View Modal */}
        {activeQuickView && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[1000] flex items-center justify-center p-4">
            <div 
              className="bg-white border border-stone-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                onClick={() => setActiveQuickView(null)}
                className="absolute top-5 right-5 p-2 bg-stone-100 rounded-full border border-stone-200 text-stone-500 hover:text-stone-800 transition-colors cursor-pointer"
                aria-label="Close details"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 sm:p-8">
                {/* Visual Header */}
                <div className="w-full h-56 bg-stone-50 rounded-2xl relative overflow-hidden flex items-center justify-center border border-stone-200 mb-6 select-none">
                  <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:1.5rem_1.5rem] opacity-50" />
                  <svg width="240" height="140" viewBox="0 0 240 140" fill="none" className="text-stone-300">
                    <rect x="20" y="10" width="200" height="120" stroke="currentColor" strokeWidth="0.8" />
                    <line x1="20" y1="70" x2="220" y2="70" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
                    <path d="M 50,110 L 120,40 L 190,110" stroke="currentColor" strokeWidth="1" />
                    <text x="30" y="30" fill="currentColor" fontSize="8" fontFamily="monospace" className="opacity-60">TECHNICAL SCHEMATIC // {activeQuickView.id.toUpperCase()}</text>
                  </svg>
                  <span className="absolute bottom-4 left-4 bg-white border border-stone-200 px-3 py-1 rounded-md text-[10px] font-mono text-stone-700 uppercase tracking-widest font-bold shadow-xs">
                    {activeQuickView.type} SPECS
                  </span>
                </div>

                <div className="flex justify-between items-start gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#e8702a] font-mono font-bold">{activeQuickView.location}</span>
                    <h3 className="text-3xl font-playfair italic font-normal text-stone-900 mt-1">{activeQuickView.title}</h3>
                  </div>
                  <div className="text-2xl font-mono font-extrabold text-[#e8702a]">
                    ${activeQuickView.price.toLocaleString()}
                  </div>
                </div>

                <p className="text-stone-600 text-sm mt-4 leading-relaxed">
                  {activeQuickView.description}
                </p>

                {/* Grid specs detailed */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-4 bg-stone-50 rounded-2xl border border-stone-150 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white border border-stone-200 rounded-lg text-[#e8702a]">
                      <Compass className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] text-stone-400 uppercase font-bold">SQ FOOTAGE</div>
                      <div className="text-stone-800 font-bold">{activeQuickView.sqft.toLocaleString()}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white border border-stone-200 rounded-lg text-[#e8702a]">
                      <LayoutGrid className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] text-stone-400 uppercase font-bold">BED/BATHS</div>
                      <div className="text-stone-800 font-bold">{activeQuickView.bedrooms}B / {activeQuickView.bathrooms}BA</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white border border-stone-200 rounded-lg text-[#e8702a]">
                      <Hammer className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] text-stone-400 uppercase font-bold">ARCHITECT</div>
                      <div className="text-stone-800 font-bold truncate max-w-[100px]">{activeQuickView.architect.split(' ')[0]}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-white border border-stone-200 rounded-lg text-[#e8702a]">
                      <CalendarDays className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[9px] text-stone-400 uppercase font-bold">YEAR BUILT</div>
                      <div className="text-stone-800 font-bold">{activeQuickView.yearBuilt}</div>
                    </div>
                  </div>
                </div>

                {/* Bullet details */}
                <div className="mt-8">
                  <h4 className="text-xs uppercase tracking-widest text-stone-500 font-mono font-bold mb-3">Sustainable Engineering & HVAC Highlights</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {activeQuickView.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-xs text-stone-700 bg-stone-50 p-3 rounded-xl border border-stone-150">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-medium">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="mt-10 pt-6 border-t border-stone-200 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => {
                      onToggleSave(activeQuickView.id);
                    }}
                    className="flex-1 bg-white border border-stone-200 text-stone-700 text-xs py-3.5 rounded-full font-bold transition-all flex items-center justify-center gap-2 hover:bg-stone-50 cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${savedIds.includes(activeQuickView.id) ? 'fill-orange-500 text-orange-500' : ''}`} />
                    <span>{savedIds.includes(activeQuickView.id) ? 'Saved' : 'Save curation to dashboard'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveQuickView(null);
                      onOpenBookingFor(activeQuickView);
                    }}
                    className="flex-1 bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs py-3.5 rounded-full font-bold transition-all text-center shadow-xs cursor-pointer"
                  >
                    Request Consultation & Tour
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
