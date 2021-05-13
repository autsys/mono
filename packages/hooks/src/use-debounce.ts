import { useState, useEffect } from 'react';

/**
 * Set value in state and return it after a delay
 * @param value - value to set
 * @param delay - wait for ms
 * @returns returns the value after debounce time
 */
export default function useDebounce(value: unknown, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set debouncedValue to value (passed in) after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
