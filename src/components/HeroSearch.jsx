import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AVAILABLE_CITIES } from '../data/properties';
import {
  HERO_BUY_PRICE_RANGES,
  HERO_RENT_PRICE_RANGES,
} from '../utils/constants';
import { useFilters } from '../context/FiltersContext';
import { SearchIcon, ChevronDownIcon } from './Icons';

export function HeroSearch() {
  const navigate = useNavigate();
  const { applyHeroSearch } = useFilters();

  const [listingType, setListingType] = useState('buy');
  const [city, setCity] = useState('all');
  const [propertyType, setPropertyType] = useState('all');
  const [priceRangeKey, setPriceRangeKey] = useState('');

  const priceRanges =
    listingType === 'rent' ? HERO_RENT_PRICE_RANGES : HERO_BUY_PRICE_RANGES;

  function handleListingTypeChange(nextType) {
    setListingType(nextType);
    setPriceRangeKey('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    const matchedRange =
      priceRanges.find((range) => range.value === priceRangeKey) ||
      priceRanges[0];

    applyHeroSearch({
      listingType,
      city,
      propertyType,
      minPrice: matchedRange.min,
      maxPrice: matchedRange.max,
    });

    navigate('/properties');
  }

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Search properties"
      className="relative z-10 mx-auto -mt-8 w-[calc(100%-1.5rem)] max-w-5xl rounded-3xl border border-black/10 bg-white p-4 shadow-xl shadow-black/5 sm:-mt-14 sm:w-[calc(100%-3rem)] sm:p-5 lg:p-6"
    >
      <div className="mb-4 flex items-center justify-between gap-4 border-b border-black/10 pb-4">
        <div
          role="group"
          aria-label="Listing type"
          className="inline-flex rounded-full bg-[#f5f5f5] p-1"
        >
          <button
            type="button"
            onClick={() => handleListingTypeChange('buy')}
            aria-pressed={listingType === 'buy'}
            className={`min-h-[40px] rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
              listingType === 'buy'
                ? 'bg-[#141414] text-white'
                : 'text-[#737373] hover:text-[#141414]'
            }`}
          >
            Buy
          </button>
          <button
            type="button"
            onClick={() => handleListingTypeChange('rent')}
            aria-pressed={listingType === 'rent'}
            className={`min-h-[40px] rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 whitespace-nowrap cursor-pointer ${
              listingType === 'rent'
                ? 'bg-[#141414] text-white'
                : 'text-[#737373] hover:text-[#141414]'
            }`}
          >
            Rent
          </button>
        </div>
        <span className="hidden text-xs font-medium text-[#737373] sm:inline">
          Verified listings across Nigeria
        </span>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-[1fr_1fr_1fr_auto] lg:items-end">
        <div className="min-w-0">
          <label
            htmlFor="hero-location"
            className="mb-1.5 block text-xs font-semibold text-[#737373]"
          >
            Location
          </label>
          <div className="relative">
            <select
              id="hero-location"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-4 pr-10 text-sm font-semibold text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
            >
              <option value="all">Any location</option>
              {AVAILABLE_CITIES.map((cityName) => (
                <option key={cityName} value={cityName}>
                  {cityName}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
          </div>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="hero-property-type"
            className="mb-1.5 block text-xs font-semibold text-[#737373]"
          >
            Property type
          </label>
          <div className="relative">
            <select
              id="hero-property-type"
              value={propertyType}
              onChange={(event) => setPropertyType(event.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-4 pr-10 text-sm font-semibold text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
            >
              <option value="all">Any type</option>
              <option value="house">House</option>
              <option value="apartment">Apartment</option>
              <option value="land">Land</option>
              <option value="commercial">Commercial</option>
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
          </div>
        </div>

        <div className="min-w-0">
          <label
            htmlFor="hero-price-range"
            className="mb-1.5 block text-xs font-semibold text-[#737373]"
          >
            Price range
          </label>
          <div className="relative">
            <select
              id="hero-price-range"
              value={priceRangeKey}
              onChange={(event) => setPriceRangeKey(event.target.value)}
              className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-4 pr-10 text-sm font-semibold text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
            >
              {priceRanges.map((range) => (
                <option key={range.value || 'any'} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
          </div>
        </div>

        <button
          type="submit"
          className="inline-flex h-12 min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#141414] px-7 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-black/85 active:translate-y-0 lg:w-auto whitespace-nowrap cursor-pointer"
        >
          <SearchIcon className="h-4 w-4" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
}
