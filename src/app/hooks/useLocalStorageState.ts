import { Dispatch, SetStateAction, useEffect, useState } from "react";

function resolveInitialValue<T>(initialValue: T | (() => T)) {
  return initialValue instanceof Function ? initialValue() : initialValue;
}

function readStoredValue<T>(key: string, fallback: T) {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const storedValue = window.localStorage.getItem(key);

    if (!storedValue) {
      return fallback;
    }

    return JSON.parse(storedValue) as T;
  } catch {
    return fallback;
  }
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T | (() => T),
) {
  const [value, setValue] = useState<T>(() => {
    const fallback = resolveInitialValue(initialValue);

    return readStoredValue(key, fallback);
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `[useLocalStorageState] Failed to save "${key}" to localStorage. ` +
          "Storage quota may be exceeded. Consider compressing stored images.",
        error,
      );
    }
  }, [key, value]);

  useEffect(() => {
    const fallback = resolveInitialValue(initialValue);

    const handleStorage = (event: StorageEvent) => {
      if (event.key !== key) {
        return;
      }

      setValue(readStoredValue(key, fallback));
    };

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        setValue(readStoredValue(key, fallback));
      }
    };

    window.addEventListener("storage", handleStorage);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("storage", handleStorage);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [initialValue, key]);

  return [value, setValue] as [T, Dispatch<SetStateAction<T>>];
}
