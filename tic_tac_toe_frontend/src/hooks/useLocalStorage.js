import { useEffect, useState } from 'react';

/**
 * Hook to store and retrieve state from localStorage with JSON serialization.
 * Key is namespaced and errors are handled gracefully.
 */
// PUBLIC_INTERFACE
export function useLocalStorage(key, initialValue) {
  const storageKey = `ttt_${key}`;

  const readValue = () => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = window.localStorage.getItem(storageKey);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  useEffect(() => {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(storedValue));
    } catch {
      // ignore write failures (e.g., in private mode)
    }
  }, [storageKey, storedValue]);

  return [storedValue, setStoredValue];
}
