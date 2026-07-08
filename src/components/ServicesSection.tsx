import React, { useState } from 'react';
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
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section
      id="services"
      className="relative w-full bg-stone-50 py-28 px-4 sm:px-8 overflow-hidden"
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

      <div className="relative max-w-7xl mx-auto flex flex-col items-center">
        {/* Section header */}
        <div className="mb-14 flex flex-col items-center text-center gap-4 max-w-2xl">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e8702a]">
            What We Build
          </span>
          <h2 className="font-playfair italic text-5xl sm:text-6xl text-stone-950 leading-[1.05]">
            Our Services
          </h2>
          <p className="text-stone-600 text-base leading-relaxed font-medium">
            From construction to sustainability, VHL delivers end-to-end real estate excellence rooted in decades of Tritech engineering expertise.
          </p>
          <div className="w-12 h-[2px] bg-[#e8702a] rounded-full mt-2" />
        </div>

        {/* Responsive Accordion Layout (Vertical on mobile, Horizontal on desktop) */}
        <div className="flex flex-col md:flex-row w-full h-[700px] md:h-[550px] gap-2 md:gap-4 mt-6">
          {services.map((service, idx) => {
            const isActive = activeIdx === idx;

            return (
              <div
                key={service.tag}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`group relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  isActive 
                    ? 'flex-[6] rounded-[2rem]' 
                    : 'flex-[1] min-h-[60px] md:min-h-0 md:min-w-[60px] rounded-[1.5rem] md:rounded-[3rem]'
                }`}
                style={{
                  boxShadow: isActive ? '0 20px 50px rgba(0,0,0,0.15)' : 'none',
                }}
              >
                {/* Background Image */}
                <img
                  src={service.image}
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{
                    transform: isActive ? 'scale(1.05)' : 'scale(1.2)',
                  }}
                />

                {/* Overlays */}
                <div
                  className={`absolute inset-0 transition-opacity duration-700 ${
                    isActive
                      ? 'bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-100'
                      : 'bg-black/40 opacity-100 group-hover:bg-black/20'
                  }`}
                />

                {/* Content (Visible only when active) */}
                <div
                  className={`absolute inset-0 flex flex-col justify-end p-6 sm:p-10 transition-all duration-700 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 sm:px-4 py-1.5 text-[10px] font-mono font-bold tracking-widest text-white uppercase bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                      {service.tag}
                    </span>
                  </div>
                  
                  <h3 className="text-3xl sm:text-4xl lg:text-5xl font-playfair italic text-white mb-3 leading-tight drop-shadow-md">
                    {service.title}
                  </h3>
                  
                  <p className="text-stone-300 text-sm sm:text-base font-medium leading-relaxed max-w-lg mb-6 sm:mb-8 drop-shadow-sm">
                    {service.desc}
                  </p>

                  <button className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-white bg-[#e8702a] hover:bg-orange-500 w-fit px-6 py-3 rounded-full transition-all hover:scale-105 active:scale-95 shadow-md">
                    Learn More <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
