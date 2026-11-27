import { useState, useEffect } from 'react';
import { AVAILABLE_CITIES } from '../data/properties';
import {
  PROPERTY_TYPES,
  BUY_PRICE_PRESETS,
  RENT_PRICE_PRESETS,
  BEDROOM_OPTIONS,
  BATHROOM_OPTIONS,
} from '../utils/constants';
import { countActiveFilters } from '../utils/filterProperties';
import { INITIAL_FILTERS, useFilters } from '../context/FiltersContext';
import {
  SearchIcon,
  SlidersIcon,
  ChevronDownIcon,
  CloseIcon,
} from './Icons';

const LISTING_TABS = [
  { value: 'all', label: 'All' },
  { value: 'buy', label: 'Buy' },
  { value: 'rent', label: 'Rent' },
];

export function FilterBar() {
  const { filters, setFilter, setListingType, applyFilters, resetFilters } =
    useFilters();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [draft, setDraft] = useState(filters);

  const activeCount = countActiveFilters(filters);
  const desktopPricePresets =
    filters.listingType === 'rent' ? RENT_PRICE_PRESETS : BUY_PRICE_PRESETS;
  const draftPricePresets =
    draft.listingType === 'rent' ? RENT_PRICE_PRESETS : BUY_PRICE_PRESETS;

  useEffect(() => {
    if (sheetOpen) {
      setDraft(filters);
    }
  }, [sheetOpen, filters]);

  useEffect(() => {
    if (!sheetOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setSheetOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sheetOpen]);

  function handleDraftListingType(nextType) {
    setDraft((previous) => ({
      ...previous,
      listingType: nextType,
      minPrice: previous.listingType !== nextType ? '' : previous.minPrice,
      maxPrice: previous.listingType !== nextType ? '' : previous.maxPrice,
    }));
  }

  function handleDraftApply(event) {
    event.preventDefault();
    applyFilters(draft);
    setSheetOpen(false);
  }

  function handleDraftReset() {
    setDraft(INITIAL_FILTERS);
    resetFilters();
    setSheetOpen(false);
  }

  return (
    <section aria-label="Property filters">
      {/* Mobile compact search + Filters trigger */}
      <div className="flex items-center gap-3 rounded-3xl border border-black/10 bg-white p-3 lg:hidden">
        <div className="relative flex-1 min-w-0">
          <label htmlFor="mobile-quick-search" className="sr-only">
            Search by area or property title
          </label>
          <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
          <input
            id="mobile-quick-search"
            type="search"
            value={filters.query}
            onChange={(event) => setFilter('query', event.target.value)}
            placeholder="Search area or title..."
            className="h-11 w-full rounded-full border border-black/10 bg-[#f5f5f5] pl-10 pr-4 text-sm text-[#141414] placeholder:text-[#737373] focus:bg-white"
          />
        </div>

        <button
          type="button"
          onClick={() => setSheetOpen(true)}
          className="inline-flex h-11 min-h-[44px] items-center justify-center gap-2 rounded-full bg-[#141414] px-4 text-sm font-semibold text-white whitespace-nowrap shrink-0 cursor-pointer"
        >
          <SlidersIcon className="h-4 w-4" />
          <span>Filters</span>
          {activeCount > 0 ? (
            <span className="inline-flex min-w-[20px] items-center justify-center rounded-full bg-white px-1.5 py-0.5 text-[11px] font-bold leading-none text-[#141414] tabular-nums">
              {activeCount}
            </span>
          ) : null}
        </button>
      </div>

      {/* Desktop full inline filter panel */}
      <div className="hidden rounded-3xl border border-black/10 bg-white p-6 lg:block">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">
            <span className="mb-1.5 block text-xs font-semibold text-[#737373]">
              Listing type
            </span>
            <div
              role="group"
              aria-label="Filter by listing type"
              className="grid grid-cols-3 rounded-2xl bg-[#f5f5f5] p-1"
            >
              {LISTING_TABS.map((tab) => (
                <button
                  key={tab.value}
                  type="button"
                  onClick={() => setListingType(tab.value)}
                  aria-pressed={filters.listingType === tab.value}
                  className={`min-h-[38px] rounded-xl px-2 text-sm font-semibold transition-all duration-150 whitespace-nowrap cursor-pointer ${
                    filters.listingType === tab.value
                      ? 'bg-[#141414] text-white'
                      : 'text-[#737373] hover:text-[#141414]'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="col-span-4 min-w-0">
            <label
              htmlFor="filter-search-query"
              className="mb-1.5 block text-xs font-semibold text-[#737373]"
            >
              Area or keyword
            </label>
            <div className="relative">
              <SearchIcon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
              <input
                id="filter-search-query"
                type="search"
                value={filters.query}
                onChange={(event) => setFilter('query', event.target.value)}
                placeholder="e.g. Lekki, Maitama, Penthouse"
                className="h-11 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] pl-10 pr-4 text-sm text-[#141414] placeholder:text-[#737373] transition-colors hover:border-black/25 focus:bg-white"
              />
            </div>
          </div>

          <div className="col-span-2 min-w-0">
            <label
              htmlFor="filter-city"
              className="mb-1.5 block text-xs font-semibold text-[#737373]"
            >
              City
            </label>
            <div className="relative">
              <select
                id="filter-city"
                value={filters.city}
                onChange={(event) => setFilter('city', event.target.value)}
                className="h-11 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
              >
                <option value="all">All cities</option>
                {AVAILABLE_CITIES.map((cityName) => (
                  <option key={cityName} value={cityName}>
                    {cityName}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
            </div>
          </div>

          <div className="col-span-3 min-w-0">
            <label
              htmlFor="filter-property-type"
              className="mb-1.5 block text-xs font-semibold text-[#737373]"
            >
              Property type
            </label>
            <div className="relative">
              <select
                id="filter-property-type"
                value={filters.propertyType}
                onChange={(event) =>
                  setFilter('propertyType', event.target.value)
                }
                className="h-11 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
              >
                {PROPERTY_TYPES.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-12 items-end gap-4 border-t border-black/10 pt-4">
          <div className="col-span-3 min-w-0">
            <label
              htmlFor="filter-min-price"
              className="mb-1.5 block text-xs font-semibold text-[#737373]"
            >
              Min price {filters.listingType === 'rent' ? '(/ yr)' : ''}
            </label>
            <div className="relative">
              <select
                id="filter-min-price"
                value={filters.minPrice}
                onChange={(event) => setFilter('minPrice', event.target.value)}
                className="h-11 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
              >
                {desktopPricePresets.map((preset) => (
                  <option
                    key={`min-${preset.value || 'any'}`}
                    value={preset.value}
                  >
                    {preset.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
            </div>
          </div>

          <div className="col-span-3 min-w-0">
            <label
              htmlFor="filter-max-price"
              className="mb-1.5 block text-xs font-semibold text-[#737373]"
            >
              Max price {filters.listingType === 'rent' ? '(/ yr)' : ''}
            </label>
            <div className="relative">
              <select
                id="filter-max-price"
                value={filters.maxPrice}
                onChange={(event) => setFilter('maxPrice', event.target.value)}
                className="h-11 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
              >
                {desktopPricePresets.map((preset) => (
                  <option
                    key={`max-${preset.value || 'any'}`}
                    value={preset.value}
                  >
                    {preset.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
            </div>
          </div>

          <div className="col-span-2 min-w-0">
            <label
              htmlFor="filter-bedrooms"
              className="mb-1.5 block text-xs font-semibold text-[#737373]"
            >
              Bedrooms
            </label>
            <div className="relative">
              <select
                id="filter-bedrooms"
                value={filters.bedrooms}
                onChange={(event) => setFilter('bedrooms', event.target.value)}
                className="h-11 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
              >
                {BEDROOM_OPTIONS.map((option) => (
                  <option key={`bed-${option.value || 'any'}`} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
            </div>
          </div>

          <div className="col-span-2 min-w-0">
            <label
              htmlFor="filter-bathrooms"
              className="mb-1.5 block text-xs font-semibold text-[#737373]"
            >
              Bathrooms
            </label>
            <div className="relative">
              <select
                id="filter-bathrooms"
                value={filters.bathrooms}
                onChange={(event) => setFilter('bathrooms', event.target.value)}
                className="h-11 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414] transition-colors hover:border-black/25 focus:bg-white cursor-pointer"
              >
                {BATHROOM_OPTIONS.map((option) => (
                  <option
                    key={`bath-${option.value || 'any'}`}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
            </div>
          </div>

          <div className="col-span-2 flex justify-end">
            <button
              type="button"
              onClick={resetFilters}
              disabled={activeCount === 0}
              className="inline-flex h-11 min-h-[44px] w-full items-center justify-center rounded-full border border-black/15 bg-white px-4 text-sm font-semibold text-[#141414] transition-all duration-200 hover:border-black/35 disabled:cursor-not-allowed disabled:opacity-45 whitespace-nowrap cursor-pointer"
            >
              Reset filters
            </button>
          </div>
        </div>
      </div>

      {/* Mobile bottom-sheet / full-screen filter panel */}
      {sheetOpen ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Filter properties"
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/45 backdrop-blur-[2px] lg:hidden"
          onClick={() => setSheetOpen(false)}
        >
          <form
            onSubmit={handleDraftApply}
            onClick={(event) => event.stopPropagation()}
            className="flex max-h-[92dvh] w-full flex-col rounded-t-3xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-black/10 px-5 py-4">
              <h2 className="text-lg font-extrabold tracking-tight text-[#141414]">
                Filters
              </h2>
              <button
                type="button"
                onClick={() => setSheetOpen(false)}
                aria-label="Close filters"
                className="inline-flex h-11 w-11 -mr-2 items-center justify-center rounded-full text-[#141414] hover:bg-black/5 cursor-pointer"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
              <div>
                <span className="mb-2 block text-xs font-semibold text-[#737373]">
                  Listing type
                </span>
                <div className="grid grid-cols-3 rounded-2xl bg-[#f5f5f5] p-1">
                  {LISTING_TABS.map((tab) => (
                    <button
                      key={`sheet-${tab.value}`}
                      type="button"
                      onClick={() => handleDraftListingType(tab.value)}
                      aria-pressed={draft.listingType === tab.value}
                      className={`min-h-[42px] rounded-xl text-sm font-semibold transition-colors cursor-pointer ${
                        draft.listingType === tab.value
                          ? 'bg-[#141414] text-white'
                          : 'text-[#737373]'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="sheet-query"
                  className="mb-1.5 block text-xs font-semibold text-[#737373]"
                >
                  Area or keyword
                </label>
                <input
                  id="sheet-query"
                  type="search"
                  value={draft.query}
                  onChange={(event) =>
                    setDraft((prev) => ({ ...prev, query: event.target.value }))
                  }
                  placeholder="e.g. Lekki, Maitama, Penthouse"
                  className="h-12 w-full rounded-2xl border border-black/10 bg-[#f5f5f5] px-4 text-sm text-[#141414] placeholder:text-[#737373] focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="sheet-city"
                    className="mb-1.5 block text-xs font-semibold text-[#737373]"
                  >
                    City
                  </label>
                  <div className="relative">
                    <select
                      id="sheet-city"
                      value={draft.city}
                      onChange={(event) =>
                        setDraft((prev) => ({ ...prev, city: event.target.value }))
                      }
                      className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-4 pr-10 text-sm font-medium text-[#141414]"
                    >
                      <option value="all">All cities</option>
                      {AVAILABLE_CITIES.map((cityName) => (
                        <option key={`sheet-city-${cityName}`} value={cityName}>
                          {cityName}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sheet-type"
                    className="mb-1.5 block text-xs font-semibold text-[#737373]"
                  >
                    Property type
                  </label>
                  <div className="relative">
                    <select
                      id="sheet-type"
                      value={draft.propertyType}
                      onChange={(event) =>
                        setDraft((prev) => ({
                          ...prev,
                          propertyType: event.target.value,
                        }))
                      }
                      className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-4 pr-10 text-sm font-medium text-[#141414]"
                    >
                      {PROPERTY_TYPES.map((option) => (
                        <option key={`sheet-type-${option.value}`} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sheet-min-price"
                    className="mb-1.5 block text-xs font-semibold text-[#737373]"
                  >
                    Min price
                  </label>
                  <div className="relative">
                    <select
                      id="sheet-min-price"
                      value={draft.minPrice}
                      onChange={(event) =>
                        setDraft((prev) => ({
                          ...prev,
                          minPrice: event.target.value,
                        }))
                      }
                      className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414]"
                    >
                      {draftPricePresets.map((preset) => (
                        <option
                          key={`sheet-min-${preset.value || 'any'}`}
                          value={preset.value}
                        >
                          {preset.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sheet-max-price"
                    className="mb-1.5 block text-xs font-semibold text-[#737373]"
                  >
                    Max price
                  </label>
                  <div className="relative">
                    <select
                      id="sheet-max-price"
                      value={draft.maxPrice}
                      onChange={(event) =>
                        setDraft((prev) => ({
                          ...prev,
                          maxPrice: event.target.value,
                        }))
                      }
                      className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414]"
                    >
                      {draftPricePresets.map((preset) => (
                        <option
                          key={`sheet-max-${preset.value || 'any'}`}
                          value={preset.value}
                        >
                          {preset.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="sheet-bedrooms"
                    className="mb-1.5 block text-xs font-semibold text-[#737373]"
                  >
                    Bedrooms
                  </label>
                  <div className="relative">
                    <select
                      id="sheet-bedrooms"
                      value={draft.bedrooms}
                      onChange={(event) =>
                        setDraft((prev) => ({
                          ...prev,
                          bedrooms: event.target.value,
                        }))
                      }
                      className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414]"
                    >
                      {BEDROOM_OPTIONS.map((option) => (
                        <option
                          key={`sheet-bed-${option.value || 'any'}`}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="sheet-bathrooms"
                    className="mb-1.5 block text-xs font-semibold text-[#737373]"
                  >
                    Bathrooms
                  </label>
                  <div className="relative">
                    <select
                      id="sheet-bathrooms"
                      value={draft.bathrooms}
                      onChange={(event) =>
                        setDraft((prev) => ({
                          ...prev,
                          bathrooms: event.target.value,
                        }))
                      }
                      className="h-12 w-full appearance-none rounded-2xl border border-black/10 bg-[#f5f5f5] pl-3.5 pr-9 text-sm font-medium text-[#141414]"
                    >
                      {BATHROOM_OPTIONS.map((option) => (
                        <option
                          key={`sheet-bath-${option.value || 'any'}`}
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
                  </div>
                </div>
              </div>
            </div>

            <div
              className="flex items-center gap-3 border-t border-black/10 bg-white px-5 pt-4"
              style={{
                paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
              }}
            >
              <button
                type="button"
                onClick={handleDraftReset}
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full border border-black/15 bg-white px-5 text-sm font-semibold text-[#141414] cursor-pointer"
              >
                Reset
              </button>
              <button
                type="submit"
                className="inline-flex min-h-[48px] flex-1 items-center justify-center rounded-full bg-[#141414] px-5 text-sm font-semibold text-white cursor-pointer"
              >
                Apply filters
              </button>
            </div>
          </form>
        </div>
      ) : null}
    </section>
  );
}
