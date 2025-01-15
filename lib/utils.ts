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

export const recordTypes = ["Income", "Expense", "Transfer"] as const;

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
  "Pro Montly",
  "Pro Yearly",
  "Premium Monthly",
  "Premium Yearly",
] as const;
