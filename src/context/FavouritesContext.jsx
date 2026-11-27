import { createContext, useMemo, useCallback } from 'react';
import { properties } from '../data/properties';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { FAVOURITES_STORAGE_KEY } from '../utils/constants';

const VALID_PROPERTY_IDS = new Set(properties.map((property) => property.id));

function sanitizeFavouriteIds(rawIds) {
  if (!Array.isArray(rawIds)) {
    return [];
  }
  const seen = new Set();
  const validIds = [];

  for (const id of rawIds) {
    if (typeof id === 'string' && VALID_PROPERTY_IDS.has(id) && !seen.has(id)) {
      seen.add(id);
      validIds.push(id);
    }
  }

  return validIds;
}

export const FavouritesContext = createContext(null);

export function FavouritesProvider({ children }) {
  const [rawFavouriteIds, setRawFavouriteIds] = useLocalStorage(
    FAVOURITES_STORAGE_KEY,
    []
  );

  const favouriteIds = useMemo(
    () => sanitizeFavouriteIds(rawFavouriteIds),
    [rawFavouriteIds]
  );

  const favouriteIdSet = useMemo(() => new Set(favouriteIds), [favouriteIds]);

  const favouriteProperties = useMemo(
    () => properties.filter((property) => favouriteIdSet.has(property.id)),
    [favouriteIdSet]
  );

  const toggleFavourite = useCallback(
    (propertyId) => {
      if (!VALID_PROPERTY_IDS.has(propertyId)) {
        return;
      }

      setRawFavouriteIds((previous) => {
        const sanitized = sanitizeFavouriteIds(previous);
        if (sanitized.includes(propertyId)) {
          return sanitized.filter((id) => id !== propertyId);
        }
        return [propertyId, ...sanitized];
      });
    },
    [setRawFavouriteIds]
  );

  const isFavourite = useCallback(
    (propertyId) => favouriteIdSet.has(propertyId),
    [favouriteIdSet]
  );

  const clearFavourites = useCallback(() => {
    setRawFavouriteIds([]);
  }, [setRawFavouriteIds]);

  const value = useMemo(
    () => ({
      favouriteIds,
      favouriteProperties,
      count: favouriteIds.length,
      toggleFavourite,
      isFavourite,
      clearFavourites,
    }),
    [
      favouriteIds,
      favouriteProperties,
      toggleFavourite,
      isFavourite,
      clearFavourites,
    ]
  );

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}
