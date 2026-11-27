import { useState, useEffect, useCallback } from 'react';
import { properties as propertiesData } from '../data/properties';

/**
 * Simulates an asynchronous property fetch with skeleton loading support,
 * cleanup on unmount, and a retry handler for error recovery.
 */
export function useProperties(delay = 600) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => {
    setError(null);
    setIsLoading(true);
    setAttempt((current) => current + 1);
  }, []);

  useEffect(() => {
    let isActive = true;
    setIsLoading(true);
    setError(null);

    const timerId = window.setTimeout(() => {
      if (!isActive) {
        return;
      }

      try {
        if (!Array.isArray(propertiesData)) {
          throw new Error('Listings data is currently unavailable.');
        }
        setData(propertiesData);
        setIsLoading(false);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load properties right now.'
        );
        setIsLoading(false);
      }
    }, delay);

    return () => {
      isActive = false;
      window.clearTimeout(timerId);
    };
  }, [delay, attempt]);

  return {
    properties: data,
    isLoading,
    error,
    retry,
  };
}
