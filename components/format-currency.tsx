"use client";

import { useState, useEffect } from "react";
import { getCurrency } from "@/actions/preferences";

interface FormatCurrencyProps {
  userId: string;
  amount: number;
}

export function FormatCurrency({ userId, amount }: FormatCurrencyProps) {
  const [formattedAmount, setFormattedAmount] = useState<string>("");

  useEffect(() => {
    const fetchCurrency = async () => {
      const currency = await getCurrency(userId);
      const formatted = formatCurrency(amount, currency);
      setFormattedAmount(formatted);
    };

    fetchCurrency();
  }, [userId, amount]);

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  return <span>{formattedAmount}</span>;
}
