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
