import React, { useState } from 'react';
import { Property, TourBooking } from '../types';
import { LUXURY_PROPERTIES } from '../data';
import { CalendarCheck, User, Mail, Phone, Calendar, Clock, Video, Plane, CheckCircle2, AlertCircle, Building, Loader2 } from 'lucide-react';

interface ContactPortalProps {
  initialProperty: Property | null;
  onBookingSuccess: (booking: TourBooking) => void;
}

const EXPERT_AGENTS = [
  {
    name: "Engr. Chowdhury Sadid",
    title: "Chief Executive Officer & MD",
    specialty: "Sustainable Real Estate & LEED Auditing",
    email: "sadid@vistanexbd.com",
    phone: "+880 178 633 7711"
  },
  {
    name: "Engr. Silas Rahman",
    title: "Director of HVAC & Infrastructure",
    specialty: "Tritech VRF Systems & Air Engineering",
    email: "s.rahman@vistanexbd.com",
    phone: "+880 178 633 7711"
  }
];

export default function ContactPortal({ initialProperty, onBookingSuccess }: ContactPortalProps) {
  // Booking state machine
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(initialProperty?.id || LUXURY_PROPERTIES[0].id);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [tourDate, setTourDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('10:00 AM');
  const [tourType, setTourType] = useState<'In-Person' | 'Virtual Video' | 'Private Helicopter'>('In-Person');
  
  // Statuses: 'idle' | 'loading' | 'success' | 'error'
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [activeBooking, setActiveBooking] = useState<TourBooking | null>(null);

  // Sync state if initial property changes in map or catalog
  React.useEffect(() => {
    if (initialProperty) {
      setSelectedPropertyId(initialProperty.id);
    }
  }, [initialProperty]);

  const timeSlots = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'];
  const tourTypes: Array<'In-Person' | 'Virtual Video' | 'Private Helicopter'> = [
    'In-Person',
    'Virtual Video',
    'Private Helicopter'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validations
    if (!clientName || !clientEmail || !clientPhone || !tourDate) {
      setErrorMessage('Please fill in all requested fields.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    // Simulate scheduling delay
    setTimeout(() => {
      const selectedProp = LUXURY_PROPERTIES.find(p => p.id === selectedPropertyId);
      if (!selectedProp) {
        setErrorMessage('Invalid property selection.');
        setStatus('error');
        return;
      }

      const bookingDetails: TourBooking = {
        propertyId: selectedProp.id,
        propertyName: selectedProp.title,
        clientName,
        clientEmail,
        clientPhone,
        date: tourDate,
        timeSlot,
        tourType,
        status: 'Confirmed'
      };

      setActiveBooking(bookingDetails);
      onBookingSuccess(bookingDetails);
      setStatus('success');
    }, 1500);
  };

  const resetForm = () => {
    setClientName('');
    setClientEmail('');
    setClientPhone('');
    setTourDate('');
    setStatus('idle');
    setActiveBooking(null);
  };

  return (
    <section id="booking" className="w-full bg-white text-stone-900 py-24 px-4 sm:px-8 border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Side: Scheduling Form */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#e8702a] font-mono font-bold">Private Viewings</span>
              <h2 className="text-4xl md:text-5xl font-playfair italic font-normal text-stone-950 mt-2">
                Secure your timeline
              </h2>
              <p className="text-stone-600 mt-3 max-w-xl text-sm leading-relaxed mb-10">
                Book an exclusive on-site development inspection or virtual engineering consultation. All inquiries are evaluated privately by Vistanex design directors and HVAC experts.
              </p>

              {status === 'success' && activeBooking ? (
                /* SUCCESS SCREEN */
                <div className="bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 text-center animate-fade-in">
                  <div className="w-14 h-14 bg-emerald-50 border border-emerald-500 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-4 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-playfair italic font-normal text-stone-900">Viewing Confirmed</h3>
                  <p className="text-xs text-stone-500 mt-1 max-w-sm mx-auto">
                    Your scheduled viewing slot has been recorded. A director will reach out within 2 hours to coordinate.
                  </p>

                  {/* Confirmation Slip */}
                  <div className="bg-white p-5 rounded-2xl border border-stone-200 text-left mt-6 max-w-md mx-auto font-mono text-xs shadow-xs">
                    <div className="flex justify-between border-b border-stone-100 pb-2 mb-2 text-[10px] text-stone-400 font-bold tracking-widest">
                      <span>CONFIRMATION PASS</span>
                      <span className="text-orange-600 font-bold font-mono">VHL-EST-{(Math.floor(Math.random() * 9000) + 1000)}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-stone-400 font-bold">CLIENT:</span>
                      <span className="text-stone-800 font-bold">{activeBooking.clientName}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-stone-400 font-bold">PROPERTY:</span>
                      <span className="text-stone-800 font-bold text-right">{activeBooking.propertyName}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-stone-400 font-bold">DATE & SLOT:</span>
                      <span className="text-stone-800 font-bold">{activeBooking.date} @ {activeBooking.timeSlot}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span className="text-stone-400 font-bold">METHOD:</span>
                      <span className="text-stone-800 font-bold flex items-center gap-1">
                        {activeBooking.tourType === 'Private Helicopter' && <Plane className="w-3.5 h-3.5 text-orange-500" />}
                        {activeBooking.tourType === 'Virtual Video' && <Video className="w-3.5 h-3.5 text-orange-500" />}
                        {activeBooking.tourType === 'In-Person' && <Building className="w-3.5 h-3.5 text-orange-500" />}
                        {activeBooking.tourType}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={resetForm}
                    className="mt-8 bg-stone-950 hover:bg-stone-850 text-white px-6 py-2.5 rounded-full text-xs font-mono font-bold transition-all cursor-pointer"
                  >
                    SCHEDULE ANOTHER TOUR
                  </button>
                </div>
              ) : (
                /* BOOKING FORM */
                <form onSubmit={handleSubmit} className="space-y-5">
                  {errorMessage && (
                    <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl text-xs text-orange-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-stone-500 tracking-wider font-bold">FULL NAME</label>
                      <div className="relative">
                        <User className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="Helena Vance"
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-xs text-stone-800 focus:outline-none focus:border-[#e8702a] transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-stone-500 tracking-wider font-bold">EMAIL ADDRESS</label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          placeholder="h.vance@exclusive.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-xs text-stone-800 focus:outline-none focus:border-[#e8702a] transition-all shadow-xs"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-stone-500 tracking-wider font-bold">CONTACT PHONE</label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          placeholder="+1 (555) 902-1402"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-xs text-stone-800 focus:outline-none focus:border-[#e8702a] transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Select Property */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-stone-500 tracking-wider font-bold">SELECT DEVELOPMENT</label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <select
                          value={selectedPropertyId}
                          onChange={(e) => setSelectedPropertyId(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-xs text-stone-800 focus:outline-none focus:border-[#e8702a] appearance-none cursor-pointer shadow-xs"
                        >
                          {LUXURY_PROPERTIES.map((prop) => (
                            <option key={prop.id} value={prop.id} className="bg-white text-stone-800">
                              {prop.title} (${(prop.price / 1000000).toFixed(1)}M)
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Tour Type Button selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono uppercase text-stone-500 tracking-wider font-bold">VIEWING METHODOLOGY</label>
                    <div className="grid grid-cols-3 gap-2">
                      {tourTypes.map((type) => {
                        const isSelected = tourType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setTourType(type)}
                            className={`py-3 px-2 rounded-xl text-[10px] font-mono font-bold uppercase transition-all border flex flex-col items-center justify-center gap-1.5 cursor-pointer ${
                              isSelected
                                ? 'bg-[#e8702a]/10 border-[#e8702a] text-[#e8702a]'
                                : 'bg-white border-stone-200 text-stone-500 hover:text-stone-800 hover:bg-stone-50 shadow-xs'
                            }`}
                          >
                            {type === 'Private Helicopter' && <Plane className="w-4 h-4" />}
                            {type === 'Virtual Video' && <Video className="w-4 h-4" />}
                            {type === 'In-Person' && <Building className="w-4 h-4" />}
                            <span>{type}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Date */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-stone-500 tracking-wider font-bold">DATE OF VIEWING</label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          required
                          value={tourDate}
                          onChange={(e) => setTourDate(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-xs text-stone-800 focus:outline-none focus:border-[#e8702a] transition-all shadow-xs"
                        />
                      </div>
                    </div>

                    {/* Preferred Timing */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono uppercase text-stone-500 tracking-wider font-bold">PREFERRED TIMING</label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2" />
                        <select
                          value={timeSlot}
                          onChange={(e) => setTimeSlot(e.target.value)}
                          className="w-full bg-white border border-stone-200 rounded-xl py-3 pl-11 pr-4 text-xs text-stone-800 focus:outline-none focus:border-[#e8702a] appearance-none cursor-pointer shadow-xs"
                        >
                          {timeSlots.map((slot) => (
                            <option key={slot} value={slot} className="bg-white text-stone-800">
                              {slot}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full bg-[#e8702a] hover:bg-[#d2611f] disabled:bg-stone-200 text-white text-xs py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-xs flex items-center justify-center gap-2 mt-4 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>VERIFYING CALENDAR SLOT...</span>
                      </>
                    ) : (
                      <>
                        <CalendarCheck className="w-4 h-4" />
                        <span>CONFIRM TIMELINE BOOKING</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Right Side: Agents Cards */}
          <div className="lg:col-span-5 bg-stone-50 border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-stone-500 uppercase font-bold">THE ADVISORY PANEL</span>
              <h3 className="text-3xl font-playfair italic mt-2 text-stone-950 font-normal">Contact Directors</h3>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Direct lines to our dedicated acquisition advisors. Feel free to contact them if you require customized structural analyses, legal easements, or escrow specifications.
              </p>

              {/* Agent Highlight rows */}
              <div className="mt-8 flex flex-col gap-6">
                {EXPERT_AGENTS.map((agent, i) => (
                  <div key={i} className="bg-white border border-stone-200 p-5 rounded-2xl flex flex-col gap-3 group hover:border-[#e8702a]/30 transition-colors shadow-xs">
                    <div>
                      <div className="text-stone-400 text-[10px] font-mono uppercase tracking-widest font-bold">{agent.title}</div>
                      <div className="text-stone-900 text-base font-bold mt-1 group-hover:text-orange-600 transition-colors">{agent.name}</div>
                      <div className="text-stone-500 text-xs mt-1 font-light italic">{agent.specialty}</div>
                    </div>

                    <div className="border-t border-stone-100 pt-3 flex flex-col gap-1 text-[11px] font-mono text-stone-500 font-medium">
                      <div className="flex justify-between">
                        <span>EMAIL:</span>
                        <a href={`mailto:${agent.email}`} className="text-stone-700 hover:text-stone-950 underline">{agent.email}</a>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span>DIRECT LINE:</span>
                        <a href={`tel:${agent.phone}`} className="text-stone-700 hover:text-stone-950">{agent.phone}</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Micro details */}
            <div className="mt-8 pt-4 border-t border-stone-150 text-[10.5px] text-stone-400 flex flex-col gap-1 text-left font-mono font-semibold">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-[#e8702a] shrink-0" />
                <span>Vistanex Headquarters: JCX Business Tower, Bashundhara, Bangladesh</span>
              </div>
              <div className="text-[10px] text-stone-400 mt-1 pl-6 font-mono">
                Phone: +880 178 633 7711 | Email: info@vistanexbd.com
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
