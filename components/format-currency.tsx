"use client";

import { useMemo } from "react";
import { useCurrency } from "@/hooks/use-currency";

interface FormatCurrencyProps {
  userId: string;
  amount: number;
}

function CurrencyFormatter({ userId, amount }: FormatCurrencyProps) {
  const currency = useCurrency(userId);

  const formattedCurrency = useMemo(() => {
    if (!currency) return null;

    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  }, [amount, currency]);

  if (!currency) {
    return <span className="animate-pulse rounded-md bg-primary/10 h-4 w-20" />;
  }

  return <>{formattedCurrency}</>;
}

export function FormatCurrency(props: FormatCurrencyProps) {
  return <CurrencyFormatter {...props} />;
}
