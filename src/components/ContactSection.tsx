import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const contactDetails = [
  {
    icon: MapPin,
    label: 'Head Office',
    value: 'Dhaka, Bangladesh',
    sub: 'RAJUK Registered Developer',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+880 1700-000000',
    sub: 'Sun – Thu, 9:00 AM – 6:00 PM',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@vistanexbd.com',
    sub: 'We respond within 24 hours',
  },
];

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.12)',
  borderRadius: '12px',
  color: 'white',
  padding: '12px 16px',
  fontSize: '14px',
  fontFamily: 'Inter, sans-serif',
  width: '100%',
  outline: 'none',
  transition: 'border-color 0.2s',
};

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — wire up to backend/API as needed
    setSubmitted(true);
  };

  return (
    <section
      id="contacts"
      className="relative w-full bg-stone-50 py-28 px-5 sm:px-10 overflow-hidden"
    >
      {/* Warm radial accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 50% 0%, rgba(232,112,42,0.06) 0%, transparent 65%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-16 text-center flex flex-col items-center gap-4">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#e8702a]">
            Get In Touch
          </span>
          <h2 className="font-playfair italic text-5xl sm:text-6xl text-stone-950 leading-[1.05]">
            Contacts
          </h2>
          <p className="text-stone-500 text-base leading-relaxed font-medium max-w-lg">
            Whether you're looking to invest, inquire about a development, or simply learn more — our team is ready to connect.
          </p>
          <div className="w-12 h-[2px] bg-[#e8702a] rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* Left: Contact Details */}
          <div className="flex flex-col gap-6">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <div
                  key={detail.label}
                  style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(250,248,245,0.70) 100%)',
                    backdropFilter: 'blur(16px) saturate(140%)',
                    WebkitBackdropFilter: 'blur(16px) saturate(140%)',
                    border: '1px solid rgba(255,255,255,0.60)',
                    borderRadius: '18px',
                    boxShadow: [
                      'inset 0 1px 0 rgba(255,255,255,0.90)',
                      '0 4px 20px rgba(0,0,0,0.06)',
                    ].join(', '),
                  }}
                  className="flex items-start gap-5 px-6 py-5"
                >
                  <div
                    style={{
                      background: 'linear-gradient(135deg, rgba(232,112,42,0.14) 0%, rgba(232,112,42,0.06) 100%)',
                      border: '1px solid rgba(232,112,42,0.20)',
                      borderRadius: '12px',
                      padding: '10px',
                      flexShrink: 0,
                    }}
                  >
                    <Icon className="w-5 h-5 text-[#e8702a]" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-400 block mb-0.5">
                      {detail.label}
                    </span>
                    <p className="text-stone-950 font-semibold text-sm">{detail.value}</p>
                    <p className="text-stone-500 text-xs mt-0.5 font-medium">{detail.sub}</p>
                  </div>
                </div>
              );
            })}

            {/* VHL tagline footer */}
            <div
              className="mt-2 px-6 py-5 rounded-2xl"
              style={{
                background: 'linear-gradient(90deg, rgba(232,112,42,0.09) 0%, rgba(232,112,42,0.03) 100%)',
                border: '1px solid rgba(232,112,42,0.16)',
              }}
            >
              <p className="text-stone-700 text-sm leading-relaxed font-medium italic font-playfair">
                "Every great building begins with a conversation. Let's start yours."
              </p>
              <p className="text-stone-400 text-xs font-mono font-semibold mt-2 uppercase tracking-wider">
                — Vistanex Holdings Ltd
              </p>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div
            style={{
              background: 'rgba(20,16,12,0.93)',
              backdropFilter: 'blur(24px) saturate(160%)',
              WebkitBackdropFilter: 'blur(24px) saturate(160%)',
              border: '1px solid rgba(255,255,255,0.09)',
              borderRadius: '24px',
              boxShadow: [
                'inset 0 1px 0 rgba(255,255,255,0.10)',
                '0 20px 60px rgba(0,0,0,0.18)',
                '0 4px 12px rgba(232,112,42,0.05)',
              ].join(', '),
              padding: '36px 32px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Glass sheen */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: '35%',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.05) 0%, transparent 100%)',
              borderRadius: '24px 24px 0 0', pointerEvents: 'none',
            }} />

            {submitted ? (
              <div className="flex flex-col items-center justify-center gap-4 py-12 text-center" style={{ position: 'relative', zIndex: 1 }}>
                <CheckCircle className="w-14 h-14 text-[#e8702a]" />
                <h3 className="text-white font-playfair italic text-2xl">Inquiry Received</h3>
                <p className="text-stone-400 text-sm leading-relaxed max-w-xs">
                  Thank you for reaching out. A VHL representative will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                style={{ position: 'relative', zIndex: 1 }}
              >
                <div className="mb-2">
                  <h3 className="text-white font-semibold text-base tracking-tight">Send an Inquiry</h3>
                  <p className="text-stone-500 text-xs mt-1 font-medium">
                    Fill in the form and our team will be in touch.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">Full Name</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">Phone</label>
                    <input
                      id="contact-phone"
                      name="phone"
                      type="tel"
                      placeholder="+880 ..."
                      value={form.phone}
                      onChange={handleChange}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">Email Address</label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={handleChange}
                    style={inputStyle}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold uppercase tracking-widest text-stone-500">Message</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Tell us about your inquiry or development interest..."
                    value={form.message}
                    onChange={handleChange}
                    style={{ ...inputStyle, resize: 'none' }}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 flex items-center justify-center gap-2 bg-[#e8702a] hover:bg-orange-500 text-white font-semibold text-sm py-3.5 rounded-xl transition-all active:scale-95 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  Send Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
