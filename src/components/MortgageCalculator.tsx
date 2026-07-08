import React, { useState, useEffect } from 'react';
import { Property, MortgageOutputs } from '../types';
import { LUXURY_PROPERTIES } from '../data';
import { Calculator, DollarSign, Percent, Calendar, ShieldCheck } from 'lucide-react';

interface MortgageCalculatorProps {
  selectedProperty: Property | null;
}

export default function MortgageCalculator({ selectedProperty }: MortgageCalculatorProps) {
  // Setup inputs with default values, matching either selected property or default Villa Quartz price
  const [homePrice, setHomePrice] = useState<number>(4850000);
  const [downPercent, setDownPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [termYears, setTermYears] = useState<number>(30);
  
  // Tax and insurance coefficients (yearly rates)
  const TAX_RATE = 0.012; // 1.2% yearly
  const INS_RATE = 0.003; // 0.3% yearly

  const [outputs, setOutputs] = useState<MortgageOutputs>({
    loanAmount: 0,
    downPaymentAmount: 0,
    monthlyPrincipalAndInterest: 0,
    monthlyPropertyTax: 0,
    monthlyInsurance: 0,
    monthlyTotal: 0
  });

  // Automatically update home price when selected property changes
  useEffect(() => {
    if (selectedProperty) {
      setHomePrice(selectedProperty.price);
    }
  }, [selectedProperty]);

  // Calculate whenever inputs change
  useEffect(() => {
    const downAmount = homePrice * (downPercent / 100);
    const principal = homePrice - downAmount;
    
    // Monthly interest calculation
    const monthlyInterest = (interestRate / 100) / 12;
    const totalPayments = termYears * 12;
    
    let monthlyPI = 0;
    if (monthlyInterest === 0) {
      monthlyPI = principal / totalPayments;
    } else {
      monthlyPI = principal * (monthlyInterest * Math.pow(1 + monthlyInterest, totalPayments)) / 
                   (Math.pow(1 + monthlyInterest, totalPayments) - 1);
    }
    
    // Estimates for monthly property tax and home insurance
    const monthlyTax = (homePrice * TAX_RATE) / 12;
    const monthlyIns = (homePrice * INS_RATE) / 12;
    const total = monthlyPI + monthlyTax + monthlyIns;

    setOutputs({
      loanAmount: principal,
      downPaymentAmount: downAmount,
      monthlyPrincipalAndInterest: Math.round(monthlyPI),
      monthlyPropertyTax: Math.round(monthlyTax),
      monthlyInsurance: Math.round(monthlyIns),
      monthlyTotal: Math.round(total)
    });
  }, [homePrice, downPercent, interestRate, termYears]);

  // Quick preset property selections
  const handlePropertyPreset = (price: number) => {
    setHomePrice(price);
  };

  // Helper to format currency
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(val);
  };

  // Calculation of percentage ratios for the visual breakdown bar
  const piRatio = (outputs.monthlyPrincipalAndInterest / outputs.monthlyTotal) * 100 || 0;
  const taxRatio = (outputs.monthlyPropertyTax / outputs.monthlyTotal) * 100 || 0;
  const insRatio = (outputs.monthlyInsurance / outputs.monthlyTotal) * 100 || 0;

  return (
    <section id="calculator" className="w-full bg-stone-50 text-stone-900 py-24 px-4 sm:px-8 border-t border-stone-250">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-14 text-center">
          <span className="text-xs uppercase tracking-widest text-[#e8702a] font-mono font-bold">Financing & Estimation</span>
          <h2 className="text-4xl md:text-5xl font-playfair italic font-normal text-stone-950 mt-2">
            Acquisition Estimator
          </h2>
          <p className="text-stone-600 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
            Run detailed financial models for your VHL selection. Instantly calculate down payments, compound interest, and comprehensive monthly escrow commitments.
          </p>
        </div>

        {/* Dynamic Calculator Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Inputs Section (Left 7 Columns) */}
          <div className="lg:col-span-7 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs">
            
            <div className="flex flex-col gap-8">
              {/* Preset selection indicator */}
              <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-stone-150">
                <span className="text-[10px] font-mono uppercase text-stone-400 mr-2 font-bold">Link with Property Preset:</span>
                {LUXURY_PROPERTIES.map((prop) => (
                  <button
                    key={prop.id}
                    onClick={() => handlePropertyPreset(prop.price)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-mono border transition-all cursor-pointer ${
                      homePrice === prop.price
                        ? 'bg-[#e8702a]/10 border-[#e8702a] text-orange-600 font-bold'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                    }`}
                  >
                    {prop.title}
                  </button>
                ))}
              </div>

              {/* Property Value Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-stone-500">
                  <span className="font-mono uppercase flex items-center gap-1 font-bold">
                    <DollarSign className="w-3.5 h-3.5 text-[#e8702a]" />
                    Property Valuation
                  </span>
                  <span className="font-mono text-stone-950 text-base font-bold">{formatCurrency(homePrice)}</span>
                </div>
                <input
                  type="range"
                  min="3000000"
                  max="8000000"
                  step="50000"
                  value={homePrice}
                  onChange={(e) => setHomePrice(Number(e.target.value))}
                  className="w-full accent-[#e8702a] bg-stone-100 h-1 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono font-bold">
                  <span>$3.0M</span>
                  <span>$5.5M</span>
                  <span>$8.0M</span>
                </div>
              </div>

              {/* Down Payment % Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-stone-500">
                  <span className="font-mono uppercase flex items-center gap-1 font-bold">
                    <Percent className="w-3.5 h-3.5 text-[#e8702a]" />
                    Equity Down Payment
                  </span>
                  <span className="font-mono text-stone-950 text-base font-bold">
                    {downPercent}% <span className="text-stone-500 text-xs">({formatCurrency(outputs.downPaymentAmount)})</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="50"
                  step="1"
                  value={downPercent}
                  onChange={(e) => setDownPercent(Number(e.target.value))}
                  className="w-full accent-[#e8702a] bg-stone-100 h-1 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono font-bold">
                  <span>10% ($Min)</span>
                  <span>30%</span>
                  <span>50% ($Max)</span>
                </div>
              </div>

              {/* Interest Rate % Slider */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center text-xs text-stone-500">
                  <span className="font-mono uppercase flex items-center gap-1 font-bold">
                    <Percent className="w-3.5 h-3.5 text-[#e8702a]" />
                    Yearly Interest Rate
                  </span>
                  <span className="font-mono text-stone-950 text-base font-bold">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="2.5"
                  max="8.5"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#e8702a] bg-stone-100 h-1 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-400 font-mono font-bold">
                  <span>2.5%</span>
                  <span>5.5%</span>
                  <span>8.5%</span>
                </div>
              </div>

              {/* Loan Term Duration Button Row */}
              <div className="flex flex-col gap-3">
                <span className="text-xs text-stone-500 font-mono uppercase flex items-center gap-1 font-bold">
                  <Calendar className="w-3.5 h-3.5 text-[#e8702a]" />
                  Amortization Schedule
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {[15, 20, 30].map((years) => (
                    <button
                      key={years}
                      onClick={() => setTermYears(years)}
                      className={`py-3 rounded-xl text-xs font-mono font-bold transition-all border cursor-pointer ${
                        termYears === years
                          ? 'bg-stone-950 text-white border-transparent shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {years} YEARS LOAN
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Micro warning note */}
            <div className="mt-8 pt-4 border-t border-stone-150 flex items-start gap-2.5 text-stone-400 text-[10.5px]">
              <ShieldCheck className="w-4 h-4 text-[#e8702a] shrink-0" />
              <span>Calculations represent indicative estimations based on current baseline luxury interest rates. Escrow estimations incorporate customized real estate property tax rates and private insurance schedules.</span>
            </div>
          </div>

          {/* Outputs Section (Right 5 Columns) */}
          <div className="lg:col-span-5 bg-white border border-stone-200 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs relative overflow-hidden">
            {/* Subtle decorative vector lines in the background */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-70 pointer-events-none" />

            <div>
              <span className="text-[10px] font-mono tracking-widest text-stone-400 uppercase font-bold">ESTIMATED EXPENDITURE</span>
              <div className="text-[11px] font-mono text-stone-500 mt-1 uppercase font-semibold">TOTAL MONTHLY COMMITMENT</div>
              <div className="text-5xl font-mono font-bold text-stone-950 mt-3 tracking-tight">
                {formatCurrency(outputs.monthlyTotal)}
                <span className="text-xs text-stone-400 font-mono font-normal">/mo</span>
              </div>

              {/* Split Breakdown Bar Graphic */}
              <div className="mt-8 flex h-2 w-full rounded-full overflow-hidden bg-stone-100">
                <div className="bg-[#e8702a] h-full" style={{ width: `${piRatio}%` }} title="Principal & Interest" />
                <div className="bg-amber-500 h-full" style={{ width: `${taxRatio}%` }} title="Property Taxes" />
                <div className="bg-stone-400 h-full" style={{ width: `${insRatio}%` }} title="Home Insurance" />
              </div>

              {/* Breakdown detail list */}
              <div className="mt-8 flex flex-col gap-4">
                {/* Principal & Interest */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-[#e8702a] rounded-sm" />
                    <span className="text-stone-600 font-medium">Principal & Interest</span>
                  </div>
                  <span className="font-mono text-stone-900 font-bold">{formatCurrency(outputs.monthlyPrincipalAndInterest)}</span>
                </div>

                {/* Property Tax */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-amber-500 rounded-sm" />
                    <span className="text-stone-600 font-medium">Escrow Taxes (1.2% yr)</span>
                  </div>
                  <span className="font-mono text-stone-900 font-bold">{formatCurrency(outputs.monthlyPropertyTax)}</span>
                </div>

                {/* Home Insurance */}
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-stone-400 rounded-sm" />
                    <span className="text-stone-600 font-medium">Comprehensive Insurance</span>
                  </div>
                  <span className="font-mono text-stone-900 font-bold">{formatCurrency(outputs.monthlyInsurance)}</span>
                </div>
              </div>

              {/* Horizontal line divider */}
              <div className="my-6 border-t border-stone-150" />

              {/* Static loan details table */}
              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-bold">DOWN PAYMENT AMOUNT</div>
                  <div className="text-stone-800 font-bold mt-1">{formatCurrency(outputs.downPaymentAmount)}</div>
                </div>
                <div>
                  <div className="text-[10px] text-stone-400 uppercase font-bold">FINANCED PRINCIPAL</div>
                  <div className="text-stone-800 font-bold mt-1">{formatCurrency(outputs.loanAmount)}</div>
                </div>
              </div>
            </div>

            {/* Instant contact trigger */}
            <div className="mt-10">
              <button 
                onClick={() => {
                  const bookElement = document.getElementById('booking');
                  if (bookElement) {
                    bookElement.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-[#e8702a] hover:bg-[#d2611f] text-white text-xs py-4 rounded-xl font-bold uppercase tracking-wider transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4" />
                Request Investment Appraisal
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
