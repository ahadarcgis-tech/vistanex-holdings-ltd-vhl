export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  type: 'Villa' | 'Penthouse' | 'Estate' | 'Pavilion' | 'Mansion';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  description: string;
  features: string[];
  tags: string[];
  // Coordinates for the custom interactive SVG neighborhood map
  coordinates: { x: number; y: number };
  status: 'Available' | 'Reserved' | 'Selling Fast';
  architect: string;
  yearBuilt: number;
}

export interface TourBooking {
  propertyId: string;
  propertyName: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  date: string;
  timeSlot: string;
  tourType: 'In-Person' | 'Virtual Video' | 'Private Helicopter';
  status: 'Pending' | 'Confirmed';
}

export interface MortgageInputs {
  homePrice: number;
  downPaymentPercent: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate: number; // yearly percent
  insuranceRate: number; // yearly percent
}

export interface MortgageOutputs {
  loanAmount: number;
  downPaymentAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyTotal: number;
}
