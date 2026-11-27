/**
 * Pure filtering and sorting utilities for Ceha Estate listings.
 */

/**
 * Checks whether a property matches the selected listing type ("all", "buy", or "rent").
 */
function matchesListingType(property, listingType) {
  if (!listingType || listingType === 'all') {
    return true;
  }
  return property.listingType === listingType;
}

/**
 * Checks whether a property belongs to the chosen city.
 */
function matchesCity(property, city) {
  if (!city || city === 'all') {
    return true;
  }
  return property.city.toLowerCase() === city.toLowerCase();
}

/**
 * Checks whether the search text matches the property's title, area, city, or address.
 */
function matchesQuery(property, query) {
  const normalized = (query || '').trim().toLowerCase();
  if (!normalized) {
    return true;
  }

  const searchable = [property.title, property.area, property.city, property.address]
    .join(' ')
    .toLowerCase();

  return searchable.includes(normalized);
}

/**
 * Checks whether a property matches the chosen property type.
 */
function matchesPropertyType(property, propertyType) {
  if (!propertyType || propertyType === 'all') {
    return true;
  }
  return property.propertyType === propertyType;
}

/**
 * Checks whether a property's price falls within the selected minimum and maximum range.
 */
function matchesPriceRange(property, minPrice, maxPrice) {
  const min = minPrice !== '' && minPrice != null ? Number(minPrice) : null;
  const max = maxPrice !== '' && maxPrice != null ? Number(maxPrice) : null;

  if (min !== null && Number.isFinite(min) && property.price < min) {
    return false;
  }
  if (max !== null && Number.isFinite(max) && property.price > max) {
    return false;
  }
  return true;
}

/**
 * Checks minimum bedroom count.
 * When set to "Any" (""), all properties including land and commercial pass.
 * When a minimum is selected, 0-bedroom listings (such as land) are naturally excluded.
 */
function matchesBedrooms(property, minBedrooms) {
  if (minBedrooms === '' || minBedrooms == null) {
    return true;
  }
  const threshold = Number(minBedrooms);
  if (!Number.isFinite(threshold)) {
    return true;
  }
  return property.bedrooms >= threshold;
}

/**
 * Checks minimum bathroom count using the same rule as bedrooms.
 */
function matchesBathrooms(property, minBathrooms) {
  if (minBathrooms === '' || minBathrooms == null) {
    return true;
  }
  const threshold = Number(minBathrooms);
  if (!Number.isFinite(threshold)) {
    return true;
  }
  return property.bathrooms >= threshold;
}

/**
 * Filters a list of properties against all active filter criteria using Array.filter and Array.every.
 */
export function filterProperties(properties, filters) {
  if (!Array.isArray(properties)) {
    return [];
  }

  const predicates = [
    (property) => matchesListingType(property, filters.listingType),
    (property) => matchesCity(property, filters.city),
    (property) => matchesQuery(property, filters.query),
    (property) => matchesPropertyType(property, filters.propertyType),
    (property) => matchesPriceRange(property, filters.minPrice, filters.maxPrice),
    (property) => matchesBedrooms(property, filters.bedrooms),
    (property) => matchesBathrooms(property, filters.bathrooms),
  ];

  return properties.filter((property) =>
    predicates.every((predicate) => predicate(property))
  );
}

/**
 * Returns a new sorted array of properties without mutating the input array.
 */
export function sortProperties(properties, sortBy) {
  if (!Array.isArray(properties)) {
    return [];
  }

  const copy = [...properties];

  switch (sortBy) {
    case 'price-asc':
      return copy.sort((a, b) => a.price - b.price);
    case 'price-desc':
      return copy.sort((a, b) => b.price - a.price);
    case 'newest':
    default:
      return copy.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }
}

/**
 * Composes filtering and sorting into a single pure helper.
 */
export function filterAndSortProperties(properties, filters, sortBy) {
  return sortProperties(filterProperties(properties, filters), sortBy);
}

/**
 * Counts how many non-default filter criteria are currently active.
 */
export function countActiveFilters(filters) {
  let count = 0;
  if (filters.listingType && filters.listingType !== 'all') count += 1;
  if (filters.city && filters.city !== 'all') count += 1;
  if ((filters.query || '').trim() !== '') count += 1;
  if (filters.propertyType && filters.propertyType !== 'all') count += 1;
  if (filters.minPrice !== '') count += 1;
  if (filters.maxPrice !== '') count += 1;
  if (filters.bedrooms !== '') count += 1;
  if (filters.bathrooms !== '') count += 1;
  return count;
}
