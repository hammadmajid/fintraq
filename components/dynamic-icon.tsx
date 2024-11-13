import {
  Banknote,
  Building,
  CircleDollarSign,
  Coins,
  CreditCard,
  DollarSign,
  Landmark,
  PiggyBank,
  Receipt,
  Wallet,
} from "lucide-react";
import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

export const icons = [
  { name: "Wallet", icon: Wallet },
  { name: "CreditCard", icon: CreditCard },
  { name: "PiggyBank", icon: PiggyBank },
  { name: "DollarSign", icon: DollarSign },
  { name: "Banknote", icon: Banknote },
  { name: "Coins", icon: Coins },
  { name: "Receipt", icon: Receipt },
  { name: "Landmark", icon: Landmark },
  { name: "Building", icon: Building },
  { name: "CircleDollarSign", icon: CircleDollarSign },
];

interface DynamicIconProps extends LucideProps {
  name: keyof typeof dynamicIconImports;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
}
