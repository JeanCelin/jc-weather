import { useState, useEffect } from "react";

export default function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    console.log(debouncedValue);
    return () => clearTimeout(handler); // Cancela o timeout se o valor mudar antes do tempo acabar
  }, [value, delay]);

  return debouncedValue;
}
