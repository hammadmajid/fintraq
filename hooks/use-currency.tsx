"use client";

import { useState, useEffect, useCallback } from "react";
import { getCurrency } from "@/actions/preferences";
import { CURRENCY_CACHE_KEY } from "@/lib/utils";

export function useCurrency(userId: string) {
  const [currency, setCurrency] = useState<string | null>(null);

  const fetchAndCacheCurrency = useCallback(async () => {
    try {
      const fetchedCurrency = await getCurrency(userId);
      setCurrency(fetchedCurrency);

      localStorage.setItem(
        CURRENCY_CACHE_KEY,
        JSON.stringify({ userId, currency: fetchedCurrency }),
      );
    } catch (error) {
      console.error("Error fetching currency:", error);
    }
  }, [userId]);

  useEffect(() => {
    // Try to get from localStorage first
    const cachedData = localStorage.getItem(CURRENCY_CACHE_KEY);
    if (cachedData) {
      const { userId: cachedUserId, currency: cachedCurrency } =
        JSON.parse(cachedData);
      if (cachedUserId === userId) {
        setCurrency(cachedCurrency);
        return;
      }
    }

    // If not in localStorage or userId doesn't match, fetch from API
    fetchAndCacheCurrency();
  }, [userId, fetchAndCacheCurrency]);

  return currency;
}
