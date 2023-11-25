// import type { MantineColorSchemeManager } from './types';
// import { isMantineColorScheme } from './is-mantine-color-scheme';

import { MantineColorSchemeManager, isMantineColorScheme } from "@mantine/core";

export interface MyCustomColorSchemeManagerOptions {
  /** Local storage key used to retrieve value with `localStorage.getItem(key)`, `mantine-color-scheme-value` by default */
  key?: string;
  defaultValue?: "light" | "dark";
}

const inMemoryStorage: Record<string, string> = {};

export function myCustomColorSchemeManager({
  key = "mantine-color-scheme-value",
  defaultValue: userDefinedDefaultValue,
}: MyCustomColorSchemeManagerOptions = {}): MantineColorSchemeManager {
  let handleStorageEvent: (event: StorageEvent) => void;

  return {
    get: (_defaultValue) => {
      const defaultValue = userDefinedDefaultValue || _defaultValue;
      console.log("defaultValue", defaultValue);
      if (typeof window === "undefined") {
        return defaultValue;
      }

      try {
        const storedColorScheme = inMemoryStorage[key];
        return isMantineColorScheme(storedColorScheme)
          ? storedColorScheme
          : defaultValue;
      } catch {
        return defaultValue;
      }
    },

    set: (value) => {
      try {
        // window.localStorage.setItem(key, value);
        inMemoryStorage[key] = value;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn(
          "[myCustomColorSchemeManager] Local storage color scheme manager was unable to save color scheme.",
          error
        );
      }
    },

    subscribe: (onUpdate) => {
      handleStorageEvent = (event) => {
        // if (event.storageArea === window.localStorage && event.key === key) {
        if (event.key === key) {
          isMantineColorScheme(event.newValue) && onUpdate(event.newValue);
        }
      };

      window.addEventListener("storage", handleStorageEvent);
    },

    unsubscribe: () => {
      window.removeEventListener("storage", handleStorageEvent);
    },

    clear: () => {
      delete inMemoryStorage[key];
      //   window.localStorage.removeItem(key);
    },
  };
}
