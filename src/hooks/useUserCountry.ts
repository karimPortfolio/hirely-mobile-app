import * as Localization from "expo-localization";
import countries from "@/data/countries.json";
import { useEffect, useState } from "react";

const countryDictionary: Record<string, string> = countries;

export interface UseUserCountryResult {
  countryName: string;
  isLoading: boolean;
}

export function useUserCountry(
  fallbackCountry: string = "usa",
): UseUserCountryResult {
  const [countryName, setCountryName] = useState<string>(fallbackCountry);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    function resolveCountry() {
      try {
        const locales = Localization.getLocales ? Localization.getLocales() : [];
        const regionCode = (locales[0]?.regionCode || Localization.region || 'US').toUpperCase();

        const name = countryDictionary[regionCode];

        if (name) {
          setCountryName(name);
        } else {
          setCountryName(fallbackCountry);
        }
      } catch (error) {
        console.warn('Failed to resolve country mapping:', error);
        setCountryName(fallbackCountry);
      } finally {
        setIsLoading(false);
      }
    }

    resolveCountry();
  }, [fallbackCountry]);

  return { countryName, isLoading };
}
