import dynamic from "next/dynamic";
import { LucideProps } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";
import { icons } from "@/lib/utils";

type IconName = (typeof icons)[number]; // Create a union type from the icons array

interface DynamicIconProps extends LucideProps {
  name: IconName;
}

export default function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const LucideIcon = dynamic(dynamicIconImports[name]);

  return <LucideIcon {...props} />;
}
