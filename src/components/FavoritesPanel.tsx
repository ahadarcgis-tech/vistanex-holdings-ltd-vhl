import React from 'react';
import { Property } from '../types';
import { LUXURY_PROPERTIES } from '../data';
import { X, Heart, MapPin, Calendar, Trash2 } from 'lucide-react';

interface FavoritesPanelProps {
  isOpen: boolean;
  onClose: () => void;
  savedIds: string[];
  onToggleSave: (id: string) => void;
  onSelectProperty: (property: Property) => void;
}

export default function FavoritesPanel({ 
  isOpen, 
  onClose, 
  savedIds, 
  onToggleSave,
  onSelectProperty
}: FavoritesPanelProps) {
  if (!isOpen) return null;

  // Retrieve saved property objects
  const savedProperties = LUXURY_PROPERTIES.filter(p => savedIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-[1000] bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in">
      {/* Click backdrop to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-white h-full border-l border-stone-200 shadow-2xl flex flex-col justify-between p-6 overflow-y-auto animate-slide-left">
        <div>
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-stone-150">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-orange-500 fill-orange-500 animate-pulse" />
              <h3 className="text-xl font-playfair italic text-stone-900 font-normal">Saved Properties</h3>
            </div>
            <button 
              onClick={onClose}
              className="p-1.5 bg-stone-50 border border-stone-200 text-stone-500 hover:text-stone-800 rounded-full transition-colors cursor-pointer"
              aria-label="Close panel"
            >
              <X className="w-4.5 h-4.5" />
            </button>
          </div>

          {/* List Content */}
          <div className="mt-6 flex flex-col gap-4">
            {savedProperties.length > 0 ? (
              savedProperties.map((prop) => (
                <div 
                  key={prop.id}
                  onClick={() => {
                    onSelectProperty(prop);
                    onClose();
                    const element = document.getElementById('listings');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="bg-stone-50/80 border border-stone-200 p-4 rounded-2xl flex gap-4 cursor-pointer hover:border-[#e8702a]/40 transition-all group shadow-xs animate-fade-in"
                >
                  {/* Small Blueprint Placeholder thumbnail */}
                  <div className="w-16 h-16 bg-white border border-stone-200 rounded-xl shrink-0 flex items-center justify-center select-none text-stone-300 group-hover:text-[#e8702a]/60 transition-colors">
                    <svg width="32" height="32" viewBox="0 0 100 100" fill="none" className="stroke-current" strokeWidth="1.5">
                      <rect x="10" y="10" width="80" height="80" rx="8" />
                      <line x1="10" y1="50" x2="90" y2="50" />
                      <circle cx="50" cy="50" r="20" />
                    </svg>
                  </div>

                  {/* Core details */}
                  <div className="flex-1 min-w-0">
                    <div className="text-[9px] font-mono text-stone-400 uppercase font-bold">{prop.type}</div>
                    <h4 className="text-stone-900 text-sm font-bold truncate mt-0.5 group-hover:text-orange-600 transition-colors">{prop.title}</h4>
                    <p className="text-stone-500 text-[10px] truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400" />
                      {prop.location}
                    </p>
                    <div className="flex items-center justify-between mt-2 pt-1.5 border-t border-stone-200/60 text-xs">
                      <span className="font-mono text-stone-850 font-bold">${(prop.price / 1000000).toFixed(2)}M</span>
                      
                      {/* Delete / Remove trigger */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleSave(prop.id);
                        }}
                        className="text-stone-400 hover:text-orange-600 p-1 rounded transition-colors cursor-pointer"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-16 text-center">
                <div className="w-12 h-12 bg-stone-50 border border-stone-200 rounded-full flex items-center justify-center text-stone-400 mx-auto mb-4">
                  <Heart className="w-5 h-5" />
                </div>
                <h5 className="text-stone-800 text-sm font-bold">No saved properties</h5>
                <p className="text-stone-500 text-xs mt-2 max-w-[200px] mx-auto leading-relaxed">
                  Click the heart icon on any curation inside the collection to save them to your active dashboard.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Action */}
        <div className="border-t border-stone-150 pt-6">
          <button
            onClick={() => {
              onClose();
              const element = document.getElementById('booking');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            disabled={savedProperties.length === 0}
            className="w-full bg-[#e8702a] hover:bg-[#d2611f] disabled:bg-stone-100 disabled:text-stone-400 disabled:border-stone-200 text-white text-xs py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Tours for Saved ({savedProperties.length})</span>
          </button>
        </div>
      </div>
    </div>
  );
}
