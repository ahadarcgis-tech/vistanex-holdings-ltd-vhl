import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const services = [
  {
    tag: 'RESIDENTIAL',
    title: 'Residential Construction',
    desc: 'From modern homes to luxury apartments, we create living spaces that feel like home.',
    image: '/service-residential.png',
  },
  {
    tag: 'COMMERCIAL',
    title: 'Commercial Projects',
    desc: 'Build offices, retail spaces, and commercial complexes that drive success.',
    image: '/service-commercial.png',
  },
  {
    tag: 'INDUSTRIAL',
    title: 'Industrial Construction',
    desc: 'Reliable and efficient facilities to power your business growth.',
    image: '/service-industrial.png',
  },
  {
    tag: 'RENOVATION',
    title: 'Renovation & Remodeling',
    desc: 'Transform existing spaces into modern, functional designs.',
    image: '/service-renovation.png',
  },
  {
    tag: 'MANAGEMENT',
    title: 'Project Management',
    desc: 'Comprehensive oversight to ensure timely and budget-friendly delivery.',
    image: '/service-management.png',
  },
  {
    tag: 'INTERIOR',
    title: 'Interior Design & Fit-Out',
    desc: 'Craft beautiful, functional interiors tailored to your space\'s needs and style.',
    image: '/service-interior.png',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-stone-50 py-28 px-5 sm:px-10 overflow-hidden"
    >
      {/* Warm radial accents */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 10%, rgba(232,112,42,0.07) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 15% 85%, rgba(120,100,70,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">

        {/* Section header */}
        <div className="mb-16 flex flex-col gap-4 max-w-xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e8702a]">
            What We Build
          </span>
          <h2 className="font-playfair italic text-5xl sm:text-6xl text-stone-950 leading-[1.05]">
            Our Services
          </h2>
          <p className="text-stone-600 text-base leading-relaxed font-medium">
            From construction to sustainability, VHL delivers end-to-end real estate excellence rooted in decades of Tritech engineering expertise.
          </p>
          <div className="w-12 h-[2px] bg-[#e8702a] rounded-full mt-1" />
        </div>

        {/* 2×3 Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.tag}
              className="group relative flex flex-col overflow-hidden cursor-pointer"
              style={{
                borderRadius: '22px',
                background: 'rgba(18,14,10,0.96)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: [
                  'inset 0 1px 0 rgba(255,255,255,0.07)',
                  '0 4px 24px rgba(0,0,0,0.18)',
                ].join(', '),
                transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = [
                  'inset 0 1px 0 rgba(255,255,255,0.09)',
                  '0 16px 48px rgba(0,0,0,0.28)',
                  '0 0 0 1px rgba(232,112,42,0.18)',
                ].join(', ');
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = [
                  'inset 0 1px 0 rgba(255,255,255,0.07)',
                  '0 4px 24px rgba(0,0,0,0.18)',
                ].join(', ');
              }}
            >
              {/* Image area */}
              <div className="relative w-full overflow-hidden" style={{ height: '220px' }}>
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  style={{ borderRadius: '22px 22px 0 0' }}
                />
                {/* Dark gradient overlay fading into card body */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(18,14,10,0.55) 85%, rgba(18,14,10,0.98) 100%)',
                    borderRadius: '22px 22px 0 0',
                  }}
                />
                {/* Tag pill */}
                <div className="absolute top-4 left-4">
                  <span
                    style={{
                      background: 'rgba(18,14,10,0.70)',
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.14)',
                      borderRadius: '999px',
                      padding: '4px 12px',
                      fontSize: '9px',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: 700,
                      letterSpacing: '0.16em',
                      color: 'rgba(255,255,255,0.75)',
                      textTransform: 'uppercase' as const,
                    }}
                  >
                    {service.tag}
                  </span>
                </div>
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 gap-3 px-6 py-5">
                <h3
                  className="text-white font-semibold leading-snug tracking-tight"
                  style={{ fontSize: '17px' }}
                >
                  {service.title}
                </h3>
                <p className="text-stone-400 text-sm leading-relaxed font-medium flex-1">
                  {service.desc}
                </p>

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/[0.06]">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-600">
                    VHL
                  </span>
                  <button
                    className="flex items-center gap-1.5 text-xs font-semibold text-[#e8702a] hover:text-orange-400 transition-colors group/btn"
                    aria-label={`Learn more about ${service.title}`}
                  >
                    Learn More
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
