import React from "react";

function useDebounce(value: any, delay: number = 1000) {
  const [debounceValue, setDebounceValue] = React.useState<any>(value);

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debounceValue;
}

export default useDebounce;
