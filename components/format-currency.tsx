interface FormatCurrencyProps {
  amount: number;
  currency: string;
}

export function FormatCurrency({ amount, currency }: FormatCurrencyProps) {
  const formatCurrency = (amount: number, currency: string): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(amount);
  };

  return <span>{formatCurrency(amount, currency)}</span>;
}
