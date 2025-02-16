"use client";

import { useState, useEffect } from "react";
import { getCurrency } from "@/actions/preferences";
import { Skeleton } from "@/components/ui/skeleton";

interface FormatCurrencyProps {
  userId: string;
  amount: number;
}

function CurrencyFormatter({ userId, amount }: FormatCurrencyProps) {
  const [currency, setCurrency] = useState<string | null>(null);

  useEffect(() => {
    getCurrency(userId).then(setCurrency);
  }, [userId]);

  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  if (!currency) {
    return <Skeleton className="h-4 w-20" />;
  }

  return <span>{formatCurrency(amount, currency)}</span>;
}

export function FormatCurrency(props: FormatCurrencyProps) {
  return <CurrencyFormatter {...props} />;
}
