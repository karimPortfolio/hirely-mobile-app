import { useState, useEffect } from 'react';
import * as Localization from 'expo-localization';

export interface UseUserCountryResult {
  countryName: string;
  isLoading: boolean;
}

export function useUserCountry(fallbackCountry: string = 'usa'): UseUserCountryResult {
  const [countryName, setCountryName] = useState<string>(fallbackCountry);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    function resolveCountry() {
      try {
        const locales = Localization.getLocales ? Localization.getLocales() : [];
        const regionCode = locales[0]?.regionCode || Localization.region || 'US';

        const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
        const fullName = regionNames.of(regionCode.toUpperCase());

        if (!fullName) {
          setCountryName(fallbackCountry);
          return;
        }

        let formattedName = fullName.toLowerCase();

        if (formattedName === 'united states') {
          formattedName = 'usa';
        }

        setCountryName(formattedName);
      } catch (error) {
        console.warn('Failed to silent-resolve device country name, falling back:', error);
        setCountryName(fallbackCountry);
      } finally {
        setIsLoading(false);
      }
    }

    resolveCountry();
  }, [fallbackCountry]);

  return { countryName, isLoading };
}