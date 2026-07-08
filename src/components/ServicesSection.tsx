import React from 'react';
import { Building2, Leaf, Wrench, LayoutGrid, ShieldCheck, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Building2,
    title: 'Premium Residential Development',
    desc: 'From luxury apartments to gated villa communities, VHL designs and delivers residences that blend architectural elegance with structural precision — built for generational value.',
    tag: 'RESIDENTIAL',
  },
  {
    icon: LayoutGrid,
    title: 'Commercial & Mixed-Use Projects',
    desc: "We develop high-performance commercial towers and mixed-use complexes that redefine Dhaka's skyline — engineered for modern business and urban living.",
    tag: 'COMMERCIAL',
  },
  {
    icon: Wrench,
    title: 'Tritech HVAC-R Integration',
    desc: 'As a Tritech sister concern, every VHL building incorporates expert HVAC-R systems — delivering superior climate control, energy efficiency, and indoor air quality.',
    tag: 'ENGINEERING',
  },
  {
    icon: Leaf,
    title: 'Sustainable Green Construction',
    desc: 'LEED-aligned building practices, eco-friendly materials, and low-carbon construction methods are embedded into every project from day one.',
    tag: 'SUSTAINABILITY',
  },
  {
    icon: ShieldCheck,
    title: 'Regulatory Compliance & Quality',
    desc: 'BNBC-compliant engineering, RAJUK-registered development, and rigorous quality standards ensure every structure is built to last and legally sound.',
    tag: 'COMPLIANCE',
  },
  {
    icon: TrendingUp,
    title: 'Property Investment Advisory',
    desc: "We guide investors through Dhaka's premium real estate market — offering data-backed insights, acquisition strategies, and portfolio planning tailored to your goals.",
    tag: 'INVESTMENT',
  },
];

const glassCard = {
  background: 'linear-gradient(135deg, rgba(255,255,255,0.72) 0%, rgba(250,248,245,0.60) 100%)',
  backdropFilter: 'blur(18px) saturate(150%)',
  WebkitBackdropFilter: 'blur(18px) saturate(150%)',
  border: '1px solid rgba(255,255,255,0.55)',
  borderRadius: '20px',
  boxShadow: [
    'inset 0 1px 0 rgba(255,255,255,0.85)',
    '0 4px 24px rgba(0,0,0,0.07)',
    '0 1px 4px rgba(232,112,42,0.04)',
  ].join(', '),
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative w-full bg-stone-50 py-28 px-5 sm:px-10 overflow-hidden"
    >
      {/* Subtle warm background accent */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 80% 20%, rgba(232,112,42,0.07) 0%, transparent 65%)',
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 20% 80%, rgba(120,100,70,0.05) 0%, transparent 60%)',
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

        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.tag}
                style={{
                  ...glassCard,
                  animationDelay: `${i * 0.08}s`,
                }}
                className="group flex flex-col gap-5 p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-default"
              >
                {/* Icon + tag row */}
                <div className="flex items-start justify-between">
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(232,112,42,0.12) 0%, rgba(232,112,42,0.05) 100%)',
                      border: '1px solid rgba(232,112,42,0.18)',
                      borderRadius: '12px',
                      padding: '10px',
                    }}
                  >
                    <Icon className="w-5 h-5 text-[#e8702a]" />
                  </div>
                  <span className="text-[9px] font-mono font-bold tracking-[0.18em] text-stone-400 uppercase mt-1">
                    {service.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-stone-950 font-semibold text-[15px] leading-snug tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-stone-500 text-sm leading-relaxed font-medium">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div className="mt-auto pt-4 border-t border-stone-200/60">
                  <div className="w-0 group-hover:w-8 h-[1.5px] bg-[#e8702a] rounded-full transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
