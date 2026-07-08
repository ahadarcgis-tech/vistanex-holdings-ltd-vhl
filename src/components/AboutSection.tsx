import React from 'react';
import { Award, Users, MapPin, Zap } from 'lucide-react';

const stats = [
  { value: '15+', label: 'Years of Excellence', icon: Award },
  { value: '200+', label: 'Professionals On Team', icon: Users },
  { value: '50+', label: 'Projects Delivered', icon: MapPin },
  { value: '100%', label: 'BNBC Compliance Rate', icon: Zap },
];

const pillars = [
  {
    title: 'Our Vision',
    body: 'To be Bangladesh\'s most trusted real estate developer — shaping sustainable cities and delivering iconic infrastructure that lasts for generations.',
  },
  {
    title: 'Our Mission',
    body: 'To blend Tritech\'s decades of engineering excellence with modern architectural design, delivering buildings that are beautiful, resilient, and environmentally responsible.',
  },
  {
    title: 'Our Values',
    body: 'Integrity in every contract. Precision in every build. Sustainability in every choice. Partnership with every client — these are the principles that define VHL.',
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-stone-950 py-28 px-5 sm:px-10 overflow-hidden"
    >
      {/* Background texture accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'radial-gradient(ellipse at 15% 50%, rgba(232,112,42,0.08) 0%, transparent 55%)',
            'radial-gradient(ellipse at 85% 20%, rgba(200,180,150,0.05) 0%, transparent 50%)',
          ].join(', '),
        }}
      />
      {/* Decorative grid lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Section label */}
        <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e8702a] block mb-5">
          Who We Are
        </span>

        {/* Two-column: Headline left, body right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="flex flex-col gap-6">
            <h2 className="font-playfair italic text-5xl sm:text-6xl text-white leading-[1.05]">
              About<br />Vistanex Holdings
            </h2>
            <div className="w-12 h-[2px] bg-[#e8702a] rounded-full" />
            <p className="text-stone-400 text-base leading-relaxed font-medium">
              Vistanex Holdings Ltd (VHL) is a premier real estate development and construction company based in Dhaka, Bangladesh. As a proud sister concern of Tritech — the country's leading HVAC-R engineering group — VHL inherits decades of technical mastery and applies it to creating landmark residential and commercial developments.
            </p>
            <p className="text-stone-500 text-sm leading-relaxed">
              We operate at the intersection of architecture, sustainability, and precision engineering. Every VHL project is a commitment to excellence: from RAJUK-registered site planning to LEED-aligned green construction practices, we raise the bar for what premium real estate means in Bangladesh.
            </p>
          </div>

          {/* Pillar cards */}
          <div className="flex flex-col gap-4">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px',
                  boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
                }}
                className="group px-6 py-5 hover:bg-white/[0.07] transition-all duration-200"
              >
                <h4 className="text-white font-semibold text-sm tracking-tight mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#e8702a] rounded-full" />
                  {pillar.title}
                </h4>
                <p className="text-stone-500 text-sm leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.07)',
            borderRadius: '20px',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
          }}
          className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/[0.07]"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-2 py-10 px-6 text-center"
              >
                <Icon className="w-5 h-5 text-[#e8702a] mb-1" />
                <span className="font-playfair italic text-4xl text-white font-bold">
                  {stat.value}
                </span>
                <span className="text-stone-500 text-xs font-mono font-semibold uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Tritech callout */}
        <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4 px-6 py-5 rounded-2xl"
          style={{
            background: 'linear-gradient(90deg, rgba(232,112,42,0.10) 0%, rgba(232,112,42,0.03) 100%)',
            border: '1px solid rgba(232,112,42,0.18)',
          }}
        >
          <div className="w-2 h-10 bg-[#e8702a] rounded-full shrink-0" />
          <div>
            <p className="text-white font-semibold text-sm">Tritech Sister Concern</p>
            <p className="text-stone-500 text-sm leading-relaxed">
              Backed by Tritech's 15+ years of HVAC-R engineering expertise, VHL buildings are among the most technically sound and climate-controlled developments in Bangladesh.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
