import { useState, useEffect, useCallback } from 'react';

function readStorageValue(key, initialValue) {
  if (typeof window === 'undefined') {
    return initialValue;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) {
      return initialValue;
    }
    return JSON.parse(raw);
  } catch {
    return initialValue;
  }
}

/**
 * Persists state in localStorage with safe JSON parsing and cross-tab syncing.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    readStorageValue(key, initialValue)
  );

  const setValue = useCallback(
    (valueOrUpdater) => {
      setStoredValue((previousValue) => {
        const nextValue =
          typeof valueOrUpdater === 'function'
            ? valueOrUpdater(previousValue)
            : valueOrUpdater;

        try {
          window.localStorage.setItem(key, JSON.stringify(nextValue));
        } catch {
          // Ignore storage quota or private browsing errors cleanly.
        }

        return nextValue;
      });
    },
    [key]
  );

  useEffect(() => {
    function handleStorage(event) {
      if (event.key !== key) {
        return;
      }

      if (event.newValue === null) {
        setStoredValue(initialValue);
        return;
      }

      try {
        setStoredValue(JSON.parse(event.newValue));
      } catch {
        setStoredValue(initialValue);
      }
    }

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key, initialValue]);

  return [storedValue, setValue];
}
