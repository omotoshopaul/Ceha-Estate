import { useEffect, useMemo } from 'react';
import { BRAND_NAME, SORT_OPTIONS } from '../utils/constants';
import {
  filterAndSortProperties,
  countActiveFilters,
} from '../utils/filterProperties';
import { useFilters } from '../context/FiltersContext';
import { useProperties } from '../hooks/useProperties';
import { useDebounce } from '../hooks/useDebounce';
import { SectionHeading } from '../components/SectionHeading';
import { FilterBar } from '../components/FilterBar';
import { PropertyGrid } from '../components/PropertyGrid';
import { EmptyState } from '../components/EmptyState';
import { ErrorMessage } from '../components/ErrorMessage';
import { ChevronDownIcon, SearchIcon } from '../components/Icons';

export function Properties() {
  const { filters, sortBy, setSortBy, resetFilters } = useFilters();
  const { properties, isLoading, error, retry } = useProperties(600);
  const debouncedQuery = useDebounce(filters.query, 300);

  useEffect(() => {
    document.title = `Properties — ${BRAND_NAME}`;
  }, []);

  const effectiveFilters = useMemo(
    () => ({
      ...filters,
      query: debouncedQuery,
    }),
    [filters, debouncedQuery]
  );

  const filteredProperties = useMemo(
    () => filterAndSortProperties(properties, effectiveFilters, sortBy),
    [properties, effectiveFilters, sortBy]
  );

  const activeFilterCount = countActiveFilters(filters);

  return (
    <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 sm:pt-12 lg:px-8">
      <div className="mb-8">
        <SectionHeading
          as="h1"
          darkText="Explore"
          mutedText="verified properties."
          className="text-[clamp(1.85rem,4vw,3rem)]"
        />
        <p className="mt-2 max-w-xl text-sm text-[#737373] sm:text-base">
          Filter homes, apartments, titled land, and commercial spaces for sale
          or annual rent across Nigeria.
        </p>
      </div>

      <FilterBar />

      <div className="mt-6 mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-3">
          <p
            aria-live="polite"
            className="text-sm font-semibold text-[#141414] tabular-nums"
          >
            {isLoading
              ? 'Loading properties...'
              : `${filteredProperties.length} ${
                  filteredProperties.length === 1 ? 'property' : 'properties'
                } found`}
          </p>

          {activeFilterCount > 0 ? (
            <>
              <span className="text-black/20" aria-hidden="true">
                /
              </span>
              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-semibold text-[#737373] underline underline-offset-4 transition-colors hover:text-[#141414] cursor-pointer"
              >
                Reset filters
              </button>
            </>
          ) : null}
        </div>

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <label
            htmlFor="properties-sort"
            className="text-xs font-semibold text-[#737373] whitespace-nowrap"
          >
            Sort by
          </label>
          <div className="relative">
            <select
              id="properties-sort"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-11 appearance-none rounded-full border border-black/15 bg-white pl-4 pr-10 text-sm font-semibold text-[#141414] transition-colors hover:border-black/35 cursor-pointer"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#737373]" />
          </div>
        </div>
      </div>

      {error ? (
        <ErrorMessage message={error} onRetry={retry} />
      ) : isLoading ? (
        <PropertyGrid isLoading skeletonCount={6} />
      ) : filteredProperties.length === 0 ? (
        <EmptyState
          icon={SearchIcon}
          title="No matching properties found"
          description="Try broadening your price range, clearing the keyword search, or resetting your active filters."
          actionLabel="Reset filters"
          onAction={resetFilters}
        />
      ) : (
        <PropertyGrid properties={filteredProperties} />
      )}
    </div>
  );
}
