import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const icons = [
  "wallet",
  "credit-card",
  "piggy-bank",
  "dollar-sign",
  "banknote",
  "coins",
  "receipt",
  "landmark",
  "building",
  "circle-dollar-sign",
] as const; // Add 'as const' to create a readonly tuple
