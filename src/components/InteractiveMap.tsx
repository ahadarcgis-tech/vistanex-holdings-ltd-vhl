import React, { useState } from 'react';
import { Property } from '../types';
import { LUXURY_PROPERTIES } from '../data';
import { MapPin, Info } from 'lucide-react';

interface InteractiveMapProps {
  onSelectProperty: (property: Property) => void;
  selectedProperty: Property | null;
}

export default function InteractiveMap({ onSelectProperty, selectedProperty }: InteractiveMapProps) {
  const [hoveredProp, setHoveredProp] = useState<Property | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('All');

  // Filter properties based on map controls
  const filteredProperties = LUXURY_PROPERTIES.filter(p => {
    if (filterStatus === 'All') return true;
    return p.status === filterStatus;
  });

  return (
    <section id="map" className="w-full bg-white text-stone-900 py-24 px-4 sm:px-8 border-t border-stone-200">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#e8702a] font-mono font-bold">Interactive Masterplan</span>
            <h2 className="text-4xl md:text-5xl font-playfair italic font-normal text-stone-950 mt-2">
              Peel back the layers
            </h2>
            <p className="text-stone-600 mt-3 max-w-xl text-sm leading-relaxed">
              Explore VHL's sustainable architectural layout through our custom engineered vector map. Click on any development boundary to examine technical air-loop layouts, environmental ratings, and luxury specifications.
            </p>
          </div>

          {/* Filter Controls */}
          <div className="flex bg-stone-100 border border-stone-200 rounded-full p-1 self-start md:self-auto shadow-xs">
            {['All', 'Available', 'Reserved', 'Selling Fast'].map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  filterStatus === status
                    ? 'bg-[#e8702a] text-white shadow-xs'
                    : 'text-stone-600 hover:text-stone-950 hover:bg-stone-200/50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Map Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Side: The Interactive Map (SVG-based) */}
          <div className="lg:col-span-8 bg-stone-50 border border-stone-200/80 rounded-2xl p-4 sm:p-6 relative overflow-hidden flex flex-col justify-between shadow-xs min-h-[450px]">
            {/* Top Status Overlays */}
            <div className="absolute top-4 left-4 z-10 flex gap-2">
              <span className="bg-white/90 backdrop-blur border border-stone-200 px-3 py-1 rounded-full text-[10px] font-mono text-stone-600 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                GPS: 23.8160° N, 90.4241° E
              </span>
              <span className="bg-white/90 backdrop-blur border border-stone-200 px-3 py-1 rounded-full text-[10px] font-mono text-stone-600">
                ELEVATION: 12M
              </span>
            </div>

            {/* Interactive SVG Canvas */}
            <div className="relative w-full aspect-[16/9] my-auto flex items-center justify-center">
              {/* Topological Blueprint SVG Background */}
              <svg 
                viewBox="0 0 800 450" 
                className="w-full h-full select-none"
                style={{ filter: 'drop-shadow(0 15px 15px rgba(0, 0, 0, 0.05))' }}
              >
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0, 0, 0, 0.03)" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" rx="8" />

                {/* Contour / Topography lines simulating a real geology real-estate map */}
                <path d="M -50,100 Q 150,50 300,120 T 600,80 T 850,150" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                <path d="M -50,160 Q 180,100 340,180 T 650,140 T 850,210" fill="none" stroke="rgba(0,0,0,0.04)" strokeWidth="1" />
                <path d="M -50,220 Q 200,150 380,240 T 700,200 T 850,270" fill="none" stroke="rgba(0,0,0,0.045)" strokeWidth="1.5" />
                <path d="M -50,280 Q 220,200 420,300 T 750,260 T 850,330" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />
                <path d="M -50,340 Q 250,250 460,360 T 800,320 T 850,390" fill="none" stroke="rgba(0,0,0,0.03)" strokeWidth="1" />

                {/* Simulated Caldera Bay Lake/River */}
                <path 
                  d="M 0,450 Q 100,430 250,380 T 500,400 T 800,430 L 800,450 Z" 
                  fill="rgba(232, 112, 42, 0.02)" 
                  stroke="rgba(232, 112, 42, 0.15)" 
                  strokeWidth="1.5"
                  strokeDasharray="4,4"
                />
                <text x="350" y="425" fill="rgba(232, 112, 42, 0.35)" fontSize="11" fontFamily="monospace" letterSpacing="2">GULSHAN LAKE BASIN</text>

                {/* Plot Boundaries (Polygons) */}
                {/* Plot Quartz (top-left) */}
                <polygon 
                  points="140,80 300,80 270,220 120,180" 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedProperty?.id === 'prop-quartz'
                      ? 'fill-[#e8702a]/15 stroke-[#e8702a] stroke-[2.5]'
                      : 'fill-stone-200/30 hover:fill-stone-200/70 stroke-stone-300 hover:stroke-stone-400 stroke-[1.2]'
                  }`}
                  onClick={() => onSelectProperty(LUXURY_PROPERTIES[0])}
                  onMouseEnter={() => setHoveredProp(LUXURY_PROPERTIES[0])}
                  onMouseLeave={() => setHoveredProp(null)}
                />
                <text x="180" y="140" fill="rgba(0,0,0,0.35)" fontSize="9" fontFamily="monospace" fontWeight="bold" pointerEvents="none">LOT 01 (VISTANEX AURA)</text>

                {/* Plot Basalt (center-bottom) */}
                <polygon 
                  points="300,200 480,220 440,360 280,320" 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedProperty?.id === 'prop-basalt'
                      ? 'fill-[#e8702a]/15 stroke-[#e8702a] stroke-[2.5]'
                      : 'fill-stone-200/30 hover:fill-stone-200/70 stroke-stone-300 hover:stroke-stone-400 stroke-[1.2]'
                  }`}
                  onClick={() => onSelectProperty(LUXURY_PROPERTIES[1])}
                  onMouseEnter={() => setHoveredProp(LUXURY_PROPERTIES[1])}
                  onMouseLeave={() => setHoveredProp(null)}
                />
                <text x="330" y="280" fill="rgba(0,0,0,0.35)" fontSize="9" fontFamily="monospace" fontWeight="bold" pointerEvents="none">LOT 14 (VISTANEX SOLIS)</text>

                {/* Plot Slate (top-right) */}
                <polygon 
                  points="450,70 650,90 600,220 400,180" 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedProperty?.id === 'prop-slate'
                      ? 'fill-[#e8702a]/15 stroke-[#e8702a] stroke-[2.5]'
                      : 'fill-stone-200/30 hover:fill-stone-200/70 stroke-stone-300 hover:stroke-stone-400 stroke-[1.2]'
                  }`}
                  onClick={() => onSelectProperty(LUXURY_PROPERTIES[2])}
                  onMouseEnter={() => setHoveredProp(LUXURY_PROPERTIES[2])}
                  onMouseLeave={() => setHoveredProp(null)}
                />
                <text x="480" y="150" fill="rgba(0,0,0,0.35)" fontSize="9" fontFamily="monospace" fontWeight="bold" pointerEvents="none">LOT 04 (ZENITH HEIGHTS)</text>

                {/* Plot Obsidian (bottom-right) */}
                <polygon 
                  points="580,240 760,260 720,380 540,340" 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedProperty?.id === 'prop-obsidian'
                      ? 'fill-[#e8702a]/15 stroke-[#e8702a] stroke-[2.5]'
                      : 'fill-stone-200/30 hover:fill-stone-200/70 stroke-stone-300 hover:stroke-stone-400 stroke-[1.2]'
                  }`}
                  onClick={() => onSelectProperty(LUXURY_PROPERTIES[3])}
                  onMouseEnter={() => setHoveredProp(LUXURY_PROPERTIES[3])}
                  onMouseLeave={() => setHoveredProp(null)}
                />
                <text x="600" y="310" fill="rgba(0,0,0,0.35)" fontSize="9" fontFamily="monospace" fontWeight="bold" pointerEvents="none">LOT 02 (PRISTINE PENTHOUSE)</text>

                {/* Plot Granite (bottom-left) */}
                <polygon 
                  points="50,240 220,240 180,380 40,340" 
                  className={`cursor-pointer transition-all duration-300 ${
                    selectedProperty?.id === 'prop-granite'
                      ? 'fill-[#e8702a]/15 stroke-[#e8702a] stroke-[2.5]'
                      : 'fill-stone-200/30 hover:fill-stone-200/70 stroke-stone-300 hover:stroke-stone-400 stroke-[1.2]'
                  }`}
                  onClick={() => onSelectProperty(LUXURY_PROPERTIES[4])}
                  onMouseEnter={() => setHoveredProp(LUXURY_PROPERTIES[4])}
                  onMouseLeave={() => setHoveredProp(null)}
                />
                <text x="65" y="300" fill="rgba(0,0,0,0.35)" fontSize="9" fontFamily="monospace" fontWeight="bold" pointerEvents="none">LOT 09 (NEXUS TOWER)</text>

                {/* Interactive Pulsing Map Pins */}
                {LUXURY_PROPERTIES.map((prop) => {
                  const isSelected = selectedProperty?.id === prop.id;
                  const isHovered = hoveredProp?.id === prop.id;
                  return (
                    <g key={prop.id} transform={`translate(${prop.coordinates.x}, ${prop.coordinates.y})`} className="pointer-events-none">
                      {/* Pulse Circle */}
                      <circle 
                        r={isSelected || isHovered ? "18" : "10"} 
                        className={`fill-[#e8702a] transition-all duration-300 ${isSelected || isHovered ? 'opacity-30 animate-ping' : 'opacity-10'}`} 
                      />
                      {/* Inner Pin Dot */}
                      <circle 
                        r="5" 
                        className={`fill-white stroke-[#e8702a] stroke-2 transition-all ${isSelected || isHovered ? 'scale-125 fill-orange-500' : ''}`} 
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Hover Tooltip Overlay inside SVG */}
              {hoveredProp && (
                <div 
                  className="absolute bg-white border border-stone-200 text-stone-900 p-3 rounded-xl shadow-md max-w-[200px] pointer-events-none z-20 transition-all animate-fade-in"
                  style={{
                    left: `${(hoveredProp.coordinates.x / 800) * 100}%`,
                    top: `${(hoveredProp.coordinates.y / 450) * 100 - 32}%`,
                    transform: 'translate(-50%, -100%)'
                  }}
                >
                  <div className="text-xs font-semibold">{hoveredProp.title}</div>
                  <div className="text-[10px] text-stone-500 mt-0.5">{hoveredProp.location}</div>
                  <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100 text-[11px]">
                    <span className="text-[#e8702a] font-mono font-bold">${(hoveredProp.price / 1000000).toFixed(2)}M</span>
                    <span className="bg-stone-100 px-1.5 py-0.5 rounded text-[9px] uppercase font-mono tracking-wider text-stone-600">{hoveredProp.status}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Map Guide */}
            <div className="mt-4 pt-4 border-t border-stone-200 flex flex-wrap gap-4 text-xs text-stone-500">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-stone-100 border border-stone-200 rounded-sm" /> 
                Survey Boundaries
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-orange-500/10 border border-orange-500 rounded-sm animate-pulse" /> 
                Active Selection Highlight
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full" /> 
                Listing Coordinate Target
              </span>
            </div>
          </div>

          {/* Right Side: Detailed Selection Panel */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            {selectedProperty ? (
              <div className="bg-white border border-stone-200 rounded-2xl p-6 flex flex-col justify-between h-full shadow-xs">
                <div>
                  <div className="flex justify-between items-start gap-4">
                    <span className="bg-stone-50 text-stone-600 font-mono text-[10px] uppercase px-2.5 py-1 rounded-full border border-stone-200 tracking-wider font-semibold">
                      {selectedProperty.type} SPEC SHEET
                    </span>
                    <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono uppercase font-bold ${
                      selectedProperty.status === 'Available' ? 'bg-emerald-100 text-emerald-800' :
                      selectedProperty.status === 'Reserved' ? 'bg-yellow-100 text-yellow-850' :
                      'bg-orange-100 text-orange-800'
                    }`}>
                      {selectedProperty.status}
                    </span>
                  </div>

                  <h3 className="text-3xl font-playfair italic mt-4 text-stone-900 font-normal">{selectedProperty.title}</h3>
                  <p className="text-stone-500 text-xs mt-1.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[#e8702a]" />
                    {selectedProperty.location}
                  </p>

                  <div className="text-3xl font-mono font-bold text-stone-950 mt-4">
                    ${selectedProperty.price.toLocaleString()}
                  </div>

                  {/* Micro stats table */}
                  <div className="grid grid-cols-2 gap-3 mt-6 bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs font-mono">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">AREA</span>
                      <span className="text-stone-800 mt-0.5 font-semibold">{selectedProperty.sqft.toLocaleString()} sqft</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">LAYOUT</span>
                      <span className="text-stone-800 mt-0.5 font-semibold">{selectedProperty.bedrooms} Bed / {selectedProperty.bathrooms} Bath</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">ARCHITECT</span>
                      <span className="text-stone-850 mt-0.5 font-semibold truncate">{selectedProperty.architect}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[9px] text-stone-500 uppercase tracking-widest font-bold">COMPLETED</span>
                      <span className="text-stone-800 mt-0.5 font-semibold">{selectedProperty.yearBuilt}</span>
                    </div>
                  </div>

                  <p className="text-stone-700 text-xs mt-6 leading-relaxed">
                    {selectedProperty.description}
                  </p>

                  <div className="mt-6">
                    <span className="text-[10px] tracking-wider uppercase font-mono text-stone-500 font-bold">Key Engineering & Sustainable Elements</span>
                    <ul className="mt-2.5 flex flex-wrap gap-1.5">
                      {selectedProperty.features.slice(0, 3).map((feat, i) => (
                        <li key={i} className="bg-stone-50 px-2.5 py-1.5 rounded-lg border border-stone-200 text-[10.5px] text-stone-700 flex items-center gap-1 font-medium">
                          <span className="w-1.5 h-1.5 bg-[#e8702a] rounded-full" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-stone-200 flex gap-3">
                  <button 
                    onClick={() => {
                      const listElement = document.getElementById('listings');
                      if (listElement) {
                        listElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs py-3.5 rounded-full font-semibold transition-all text-center border border-stone-200/80 cursor-pointer"
                  >
                    View Details
                  </button>
                  <button 
                    onClick={() => {
                      const bookElement = document.getElementById('booking');
                      if (bookElement) {
                        bookElement.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="flex-1 bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs py-3.5 rounded-full font-semibold transition-all text-center shadow-xs cursor-pointer"
                  >
                    Schedule Tour
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-stone-50 border border-stone-200 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
                <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-[#e8702a] mb-4">
                  <MapPin className="w-5 h-5 animate-bounce text-[#e8702a]" />
                </div>
                <h4 className="text-xl font-medium text-stone-800">Select a Plot Boundary</h4>
                <p className="text-xs text-stone-500 mt-2 max-w-[240px] leading-relaxed">
                  Hover or click on the highlighted sectors of the topographic blueprint map to retrieve listing specifications.
                </p>
                <button 
                  onClick={() => onSelectProperty(LUXURY_PROPERTIES[0])}
                  className="mt-5 text-xs text-[#e8702a] hover:text-[#d2611f] font-mono font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  Inspect Plot 01
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
