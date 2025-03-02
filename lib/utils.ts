import { SelectRecord } from "@/drizzle/db/schema";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const icons = [
  "Wallet",
  "CreditCard",
  "PiggyBank",
  "DollarSign",
  "Banknote",
  "Coins",
  "Receipt",
  "Landmark",
  "Building",
  "CircleDollarSign",
] as const; // Add 'as const' to create a readonly tuple

export const bankAccountTypes = [
  "Cash",
  "Checking",
  "Savings",
  "Credit",
  "Debit",
  "Investment",
  "Loan",
  "Other",
] as const;

export const recordTypes = [
  "Income",
  "Expense",
  "Transfer In",
  "Transfer Out",
] as const;

export const recordCategories = [
  "Salary",
  "Bonus",
  "Interest",
  "Dividend",
  "Gift",
  "Investment",
  "Rent",
  "Utilities",
  "Groceries",
  "Dining",
  "Transportation",
  "Entertainment",
  "Health",
  "Insurance",
  "Education",
  "Charity",
  "Transfer",
  "Other",
] as const;

export const recordStatuses = ["Pending", "Completed", "Failed"] as const;

export const subscriptionPlans = [
  "Hobbyist",
  "Pro Monthly",
  "Pro Yearly",
  "Premium Monthly",
  "Premium Yearly",
] as const;

export function getRelativeTime(date: Date): string {
  const now = new Date();
  const diffInMilliseconds = date.getTime() - now.getTime();

  const timeUnits: { [key: string]: number } = {
    year: 365 * 24 * 60 * 60 * 1000,
    month: 30 * 24 * 60 * 60 * 1000, // Approximation
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };

  let remainingTime = Math.abs(diffInMilliseconds);
  const result: string[] = [];
  let largestUnit: string | null = null;

  for (const [unit, value] of Object.entries(timeUnits)) {
    const count = Math.floor(remainingTime / value);
    if (count > 0) {
      if (!largestUnit) {
        largestUnit = unit;
        result.unshift(`${count} ${largestUnit}${count > 1 ? "s" : ""}`);
      } else {
        result.push(`${count} ${unit}${count > 1 ? "s" : ""}`);
        break; // Stop after the first larger unit
      }
      remainingTime -= count * value;
    }
  }

  const tense = diffInMilliseconds > 0 ? "in" : "ago";
  return result.length > 0
    ? `${tense === "in" ? "in " : ""}${result.join(" and ")}${tense === "ago" ? " ago" : ""}`
    : "just now";
}

export function calculateTotalBalance(records: SelectRecord[]): number {
  const income = records.reduce((accumulator, current) => {
    return current.type === "Income" || current.type === "Transfer In"
      ? accumulator + Number(current.amount)
      : accumulator;
  }, 0);
  const expenses = records.reduce((accumulator, current) => {
    return current.type === "Expense" || current.type === "Transfer Out"
      ? accumulator + Number(current.amount)
      : accumulator;
  }, 0);

  return income - expenses;
}

export function calculateTotalExpenses(records: SelectRecord[]): number {
  const expenses = records.reduce((accumulator, current) => {
    return current.type === "Expense" || current.type === "Transfer Out"
      ? accumulator + Number(current.amount)
      : accumulator;
  }, 0);

  return expenses;
}

export const CURRENCY_CACHE_KEY = "userPreferredCurrency";

export const currencies = [
  { label: "USD - United States Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "GBP - British Pound Sterling", value: "GBP" },
  { label: "AUD - Australian Dollar", value: "AUD" },
  { label: "CAD - Canadian Dollar", value: "CAD" },
  { label: "CHF - Swiss Franc", value: "CHF" },
  { label: "CNY - Chinese Yuan", value: "CNY" },
  { label: "SEK - Swedish Krona", value: "SEK" },
  { label: "NZD - New Zealand Dollar", value: "NZD" },
  { label: "PKR - Pakistani Rupee", value: "PKR" },
  { label: "MXN - Mexican Peso", value: "MXN" },
  { label: "SGD - Singapore Dollar", value: "SGD" },
  { label: "HKD - Hong Kong Dollar", value: "HKD" },
  { label: "NOK - Norwegian Krone", value: "NOK" },
  { label: "KRW - South Korean Won", value: "KRW" },
  { label: "TRY - Turkish Lira", value: "TRY" },
  { label: "RUB - Russian Ruble", value: "RUB" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "BRL - Brazilian Real", value: "BRL" },
  { label: "ZAR - South African Rand", value: "ZAR" },
] as const;
