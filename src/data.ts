import { Property } from './types';

export const LUXURY_PROPERTIES: Property[] = [
  {
    id: 'prop-quartz',
    title: 'Vistanex Aura',
    price: 4850000,
    location: 'Gulshan-2, Dhaka, Bangladesh',
    type: 'Villa',
    bedrooms: 5,
    bathrooms: 6,
    sqft: 6800,
    description: 'VHL’s flagship luxury residential development overlooking the tranquil Gulshan Lake. It features Tritech’s premium VRF air conditioning and fresh-air management systems for absolute dust-free, energy-efficient indoor climate control.',
    features: [
      'Tritech Premium VRF Cooling & Air Filtration',
      'Double-glazed low-E thermal insulation glass',
      'Solar-assisted energy grid & smart meters',
      'Rainwater harvesting and advanced filtration'
    ],
    tags: ['Gulshan Lakefront', 'Tritech VRF HVAC', 'Energy Efficient'],
    coordinates: { x: 220, y: 140 },
    status: 'Available',
    architect: 'VHL Architectural Studio',
    yearBuilt: 2025
  },
  {
    id: 'prop-basalt',
    title: 'Vistanex Solis',
    price: 3600000,
    location: 'Banani, Dhaka, Bangladesh',
    type: 'Pavilion',
    bedrooms: 4,
    bathrooms: 4.5,
    sqft: 5200,
    description: 'An elegant residential pavilion engineered with high-performance insulation, maximizing natural light while reducing heat gain. Built with international construction and green building standards.',
    features: [
      'High-performance eco-friendly insulation',
      'Centralized mechanical ventilation by Tritech',
      'Sub-surface smart drainage systems',
      'Rooftop solar microgrid array'
    ],
    tags: ['Banani Elite', 'Green Construction', 'Zero Carbon Ready'],
    coordinates: { x: 380, y: 280 },
    status: 'Selling Fast',
    architect: 'Tritech & Partners',
    yearBuilt: 2026
  },
  {
    id: 'prop-slate',
    title: 'Vistanex Zenith Heights',
    price: 7200000,
    location: 'Bashundhara R/A, Dhaka, Bangladesh',
    type: 'Estate',
    bedrooms: 6,
    bathrooms: 7,
    sqft: 8500,
    description: 'An expansive high-end estate designed to withstand modern urban challenges. Incorporates industrial-grade seismic engineering, centralized water treatment, and a dedicated Tritech ventilation plant.',
    features: [
      'Seismic-reinforced structural column design',
      'Tritech central fresh air system',
      'Double-height lake view living atrium',
      'Private multi-level smart security zone'
    ],
    tags: ['Bashundhara Prime', 'Seismic Reinforced', 'Centralized Air Loop'],
    coordinates: { x: 550, y: 120 },
    status: 'Available',
    architect: 'Global Design Consultants',
    yearBuilt: 2024
  },
  {
    id: 'prop-obsidian',
    title: 'Vistanex Pristine Penthouse',
    price: 5400000,
    location: 'Baridhara Diplomatic Zone, Dhaka',
    type: 'Penthouse',
    bedrooms: 3,
    bathrooms: 3.5,
    sqft: 4100,
    description: 'A diplomatic-grade sky penthouse offering total security, acoustic insulation, and medical-grade air purification loops designed and commissioned by VHL’s engineering group.',
    features: [
      'Multi-layer soundproofing and thermal barriers',
      'HEPA-13 integrated fresh air system',
      'Biometric access & private express elevator',
      'Wrap-around sky garden with automated irrigation'
    ],
    tags: ['Baridhara Diplomatic', 'HEPA-13 Pure Air', 'Absolute Privacy'],
    coordinates: { x: 670, y: 320 },
    status: 'Reserved',
    architect: 'VHL Engineering Team',
    yearBuilt: 2025
  },
  {
    id: 'prop-granite',
    title: 'Vistanex Nexus Tower',
    price: 6100000,
    location: 'JCX Business Area, Bashundhara, Dhaka',
    type: 'Mansion',
    bedrooms: 5,
    bathrooms: 5.5,
    sqft: 7400,
    description: 'A state-of-the-art residential-commercial masterpiece exhibiting sustainable development at its finest. Utilizing carbon-cured concrete and smart automated building management systems.',
    features: [
      'Carbon-cured durable green concrete',
      'Full building automation systems (BMS)',
      'High-efficiency Tritech water-cooled chillers',
      'Advanced waste management systems'
    ],
    tags: ['JCX Business District', 'Smart Building', 'Water Cooled Chillers'],
    coordinates: { x: 120, y: 340 },
    status: 'Available',
    architect: 'Tritech Engineering & Architecture',
    yearBuilt: 2025
  }
];
