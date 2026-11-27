import { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

export const INITIAL_FILTERS = {
  listingType: 'all',
  city: 'all',
  query: '',
  propertyType: 'all',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
};

const INITIAL_STATE = {
  filters: INITIAL_FILTERS,
  sortBy: 'newest',
};

function filtersReducer(state, action) {
  switch (action.type) {
    case 'SET_FILTER': {
      const { name, value } = action.payload;
      return {
        ...state,
        filters: {
          ...state.filters,
          [name]: value,
        },
      };
    }

    case 'SET_LISTING_TYPE': {
      const nextType = action.payload;
      if (state.filters.listingType === nextType) {
        return state;
      }
      return {
        ...state,
        filters: {
          ...state.filters,
          listingType: nextType,
          minPrice: '',
          maxPrice: '',
        },
      };
    }

    case 'APPLY_HERO_SEARCH': {
      return {
        ...state,
        filters: {
          ...INITIAL_FILTERS,
          listingType: action.payload.listingType || 'buy',
          city: action.payload.city || 'all',
          propertyType: action.payload.propertyType || 'all',
          minPrice: action.payload.minPrice || '',
          maxPrice: action.payload.maxPrice || '',
        },
      };
    }

    case 'APPLY_FILTERS': {
      return {
        ...state,
        filters: {
          ...INITIAL_FILTERS,
          ...action.payload,
        },
      };
    }

    case 'SET_SORT': {
      return {
        ...state,
        sortBy: action.payload,
      };
    }

    case 'RESET_FILTERS': {
      return {
        ...state,
        filters: INITIAL_FILTERS,
      };
    }

    default:
      return state;
  }
}

const FiltersContext = createContext(null);

export function FiltersProvider({ children }) {
  const [state, dispatch] = useReducer(filtersReducer, INITIAL_STATE);

  const setFilter = useCallback((name, value) => {
    dispatch({ type: 'SET_FILTER', payload: { name, value } });
  }, []);

  const setListingType = useCallback((listingType) => {
    dispatch({ type: 'SET_LISTING_TYPE', payload: listingType });
  }, []);

  const applyHeroSearch = useCallback((searchParams) => {
    dispatch({ type: 'APPLY_HERO_SEARCH', payload: searchParams });
  }, []);

  const applyFilters = useCallback((nextFilters) => {
    dispatch({ type: 'APPLY_FILTERS', payload: nextFilters });
  }, []);

  const setSortBy = useCallback((sortBy) => {
    dispatch({ type: 'SET_SORT', payload: sortBy });
  }, []);

  const resetFilters = useCallback(() => {
    dispatch({ type: 'RESET_FILTERS' });
  }, []);

  const value = useMemo(
    () => ({
      filters: state.filters,
      sortBy: state.sortBy,
      setFilter,
      setListingType,
      applyHeroSearch,
      applyFilters,
      setSortBy,
      resetFilters,
    }),
    [
      state.filters,
      state.sortBy,
      setFilter,
      setListingType,
      applyHeroSearch,
      applyFilters,
      setSortBy,
      resetFilters,
    ]
  );

  return (
    <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>
  );
}

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters must be used within a FiltersProvider.');
  }
  return context;
}
