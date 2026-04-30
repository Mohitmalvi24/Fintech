import { useState, useEffect } from 'react';

/**
 * useFetch Hook
 * Handles API/data fetching with loading, error, and empty states.
 */
export function useFetch<T>(fetchFn: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFn();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'An unexpected error occurred');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error, isEmpty: !data || (Array.isArray(data) && data.length === 0) };
}

/**
 * useAnalytics Hook
 * Mock Google Analytics event tracking.
 */
export function useAnalytics() {
  const trackEvent = (eventName: string, params?: Record<string, any>) => {
    // In production, this would call gtag('event', eventName, params)
    console.log(`[Analytics] Event: ${eventName}`, params);
    
    // Example: Integration with a real gtag if available
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
  };

  return { trackEvent };
}

/**
 * useDebounce Hook
 * Delays the update of a value to avoid rapid re-executions (e.g. search).
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

/**
 * useLocalStorage Hook
 * Persists data in localStorage and stays in sync with state.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Global type for gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
