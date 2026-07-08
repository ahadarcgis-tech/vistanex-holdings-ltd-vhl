import React from 'react';
import { ArrowDown } from 'lucide-react';

const HERO_BG_IMAGE = "/hero-bg.jpg";

interface SpotlightHeroProps {
  onStartExploring: () => void;
}

export default function SpotlightHero({ onStartExploring }: SpotlightHeroProps) {
  return (
    <section 
      id="hero"
      className="relative w-full overflow-hidden h-screen select-none bg-stone-100"
      style={{ height: '100dvh' }}
    >
      {/* Background Image Layer - Slightly Blurred */}
      <div 
        className="absolute inset-0 bg-center bg-cover bg-no-repeat transition-transform duration-1000 hero-zoom"
        style={{
          backgroundImage: `url(${HERO_BG_IMAGE})`,
          filter: 'blur(3px)',
          transform: 'scale(1.03)', /* prevents blur edge bleed */
        }}
      />

      {/* White gradient fade from top to midway */}
      <div 
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.2) 40%, transparent 60%)',
        }}
      />

      {/* Heading Content Layer */}
      <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex flex-col items-center text-center px-5 pointer-events-none z-30">
        <h1 className="text-white leading-[0.95]">
          <span 
            className="block font-playfair italic font-normal text-5xl sm:text-7xl md:text-8xl hero-anim hero-reveal"
            style={{ 
              letterSpacing: '-0.04em',
              animationDelay: '0.2s' 
            }}
          >
            Building Your Dreams
          </span>
          <span 
            className="block font-bold text-5xl sm:text-7xl md:text-8xl -mt-1 hero-anim hero-reveal"
            style={{ 
              letterSpacing: '-0.04em',
              animationDelay: '0.35s' 
            }}
          >
            With Precision
          </span>
        </h1>
        
        <div className="mt-8 flex gap-3 pointer-events-auto bg-white/85 backdrop-blur-md px-5 py-2.5 rounded-full border border-stone-200 shadow-sm text-xs text-stone-800 font-mono tracking-wider items-center">
          <span className="w-1.5 h-1.5 bg-[#e8702a] rounded-full animate-ping" />
          <span>VISTANEX HOLDINGS LTD // TRITECH SISTER CONCERN</span>
        </div>
      </div>

      {/* Bottom-Left Paragraph — Liquid Glass Card */}
      <div 
        className="hidden sm:block absolute bottom-14 left-10 md:left-14 max-w-[280px] z-30 hero-anim hero-fade"
        style={{ animationDelay: '0.6s' }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(28,22,16,0.55) 0%, rgba(18,14,10,0.48) 60%, rgba(40,28,16,0.42) 100%)',
            backdropFilter: 'blur(20px) saturate(160%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%) brightness(0.9)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.18)',
              'inset 0 -1px 0 rgba(0,0,0,0.25)',
              'inset 1px 0 0 rgba(255,255,255,0.06)',
              '0 8px 32px rgba(0,0,0,0.35)',
              '0 2px 8px rgba(232,112,42,0.08)',
            ].join(', '),
            padding: '18px 20px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glass sheen sweep */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
            borderRadius: '16px 16px 0 0',
            pointerEvents: 'none',
          }} />
          <p className="text-base text-white leading-relaxed font-medium" style={{ position: 'relative', zIndex: 1, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
            Inheriting decades of expert HVAC-R knowledge and construction excellence to deliver premium quality developments.
          </p>
        </div>
      </div>

      {/* Bottom-Right Block & Call to Action */}
      <div 
        className="absolute bottom-10 sm:bottom-14 left-5 right-5 sm:left-auto sm:right-10 md:right-14 max-w-full sm:max-w-[280px] flex flex-col items-start gap-4 sm:gap-5 z-30 hero-anim hero-fade"
        style={{ animationDelay: '0.75s' }}
      >
        {/* Liquid Glass Card — Right Description */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(28,22,16,0.55) 0%, rgba(18,14,10,0.48) 60%, rgba(40,28,16,0.42) 100%)',
            backdropFilter: 'blur(20px) saturate(160%) brightness(0.9)',
            WebkitBackdropFilter: 'blur(20px) saturate(160%) brightness(0.9)',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.10)',
            boxShadow: [
              'inset 0 1px 0 rgba(255,255,255,0.18)',
              'inset 0 -1px 0 rgba(0,0,0,0.25)',
              'inset 1px 0 0 rgba(255,255,255,0.06)',
              '0 8px 32px rgba(0,0,0,0.35)',
              '0 2px 8px rgba(232,112,42,0.08)',
            ].join(', '),
            padding: '18px 20px',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Glass sheen sweep */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '40%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.07) 0%, transparent 100%)',
            borderRadius: '16px 16px 0 0',
            pointerEvents: 'none',
          }} />
          <p className="text-sm sm:text-base text-white leading-relaxed font-medium" style={{ position: 'relative', zIndex: 1, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
            VHL is a pioneering real estate and construction company redefining Bangladesh's skyline through sustainable, modern, and iconic developments.
          </p>
        </div>
        
        <button 
          onClick={onStartExploring}
          className="bg-stone-950 hover:bg-stone-850 text-white text-sm font-semibold px-7 py-3.5 rounded-full transition-all hover:scale-[1.03] active:scale-95 shadow-md flex items-center gap-2 group pointer-events-auto cursor-pointer"
        >
          <span>Start Exploring</span>
          <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-1" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-1.5 opacity-80 text-stone-800 pointer-events-none">
        <span className="text-[10px] tracking-widest uppercase font-mono font-bold">SCROLL</span>
        <div className="w-[1.5px] h-6 bg-stone-300 rounded-full overflow-hidden">
          <div className="w-full bg-stone-800 animate-bounce" style={{ height: '50%', animationDuration: '2s' }} />
        </div>
      </div>
    </section>
  );
}
