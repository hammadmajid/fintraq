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
