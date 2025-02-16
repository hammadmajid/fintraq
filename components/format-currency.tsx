"use client";

import { useMemo } from "react";
import { useCurrency } from "@/hooks/use-currency";
import { Skeleton } from "@/components/ui/skeleton";

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
    return <Skeleton className="h-4 w-20" />;
  }

  return <span>{formattedCurrency}</span>;
}

export function FormatCurrency(props: FormatCurrencyProps) {
  return <CurrencyFormatter {...props} />;
}
