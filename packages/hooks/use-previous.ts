import { useEffect, useRef } from "react";

/**
 * Store previous value in a ref for later use.
 * @param value - value to set as a ref
 * @returns returns ref.current for use
 */
export function usePrevious<T>(value: T): unknown {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export default usePrevious;
