export const BRAND_NAME = 'Ceha Estate';
export const CONTACT_EMAIL = 'longzman001@gmail.com';
export const WHATSAPP_URL = 'https://wa.link/c8j3n4';

export const FAVOURITES_STORAGE_KEY = 'ceha_estate_favourites_v1';

export const PROPERTY_TYPES = [
  { value: 'all', label: 'All types' },
  { value: 'house', label: 'House' },
  { value: 'apartment', label: 'Apartment' },
  { value: 'land', label: 'Land' },
  { value: 'commercial', label: 'Commercial' },
];

export const PROPERTY_TYPE_LABELS = {
  house: 'House',
  apartment: 'Apartment',
  land: 'Land',
  commercial: 'Commercial',
};

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

export const HERO_BUY_PRICE_RANGES = [
  { value: '', label: 'Any price', min: '', max: '' },
  { value: '0-80000000', label: 'Under ₦80M', min: '', max: '80000000' },
  { value: '80000000-150000000', label: '₦80M – ₦150M', min: '80000000', max: '150000000' },
  { value: '150000000-300000000', label: '₦150M – ₦300M', min: '150000000', max: '300000000' },
  { value: '300000000-', label: '₦300M+', min: '300000000', max: '' },
];

export const HERO_RENT_PRICE_RANGES = [
  { value: '', label: 'Any price', min: '', max: '' },
  { value: '0-5000000', label: 'Under ₦5M / yr', min: '', max: '5000000' },
  { value: '5000000-12000000', label: '₦5M – ₦12M / yr', min: '5000000', max: '12000000' },
  { value: '12000000-20000000', label: '₦12M – ₦20M / yr', min: '12000000', max: '20000000' },
  { value: '20000000-', label: '₦20M+ / yr', min: '20000000', max: '' },
];

export const BUY_PRICE_PRESETS = [
  { value: '', label: 'Any' },
  { value: '40000000', label: '₦40M' },
  { value: '80000000', label: '₦80M' },
  { value: '120000000', label: '₦120M' },
  { value: '200000000', label: '₦200M' },
  { value: '300000000', label: '₦300M' },
  { value: '500000000', label: '₦500M' },
];

export const RENT_PRICE_PRESETS = [
  { value: '', label: 'Any' },
  { value: '2000000', label: '₦2M' },
  { value: '5000000', label: '₦5M' },
  { value: '10000000', label: '₦10M' },
  { value: '15000000', label: '₦15M' },
  { value: '20000000', label: '₦20M' },
  { value: '30000000', label: '₦30M' },
];

export const BEDROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
  { value: '5', label: '5+' },
];

export const BATHROOM_OPTIONS = [
  { value: '', label: 'Any' },
  { value: '1', label: '1+' },
  { value: '2', label: '2+' },
  { value: '3', label: '3+' },
  { value: '4', label: '4+' },
];

export const SITE_STATS = [
  { value: '1,250+', label: 'Verified Properties' },
  { value: '350+', label: 'Trusted Agents' },
  { value: '₦850M+', label: 'Sales Closed' },
  { value: '98%', label: 'Client Satisfaction' },
];
