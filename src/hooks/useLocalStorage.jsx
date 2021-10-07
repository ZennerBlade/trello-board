import { useEffect, useState } from "react";

const getFromLocalStorage = (key, initVal) => {
  const value = JSON.parse(localStorage.getItem(key));
  if (key === "card") {
    return value ? new Map(value) : initVal;
  }
  return value?.length ? value : initVal;
};

const useLocalStorage = (key, initVal) => {
  const [value, setValue] = useState(() => getFromLocalStorage(key, initVal));

  useEffect(() => {
    if (value instanceof Map) {
      localStorage.setItem(key, JSON.stringify(Array.from(value.entries())));
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value]);

  return [value, setValue];
};

export default useLocalStorage;
