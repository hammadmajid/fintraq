import { LucideProps } from "lucide-react";
import { icons } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

type IconName = (typeof icons)[number];

interface DynamicIconProps extends Omit<LucideProps, "ref"> {
  name: IconName;
}

export function DynamicIcon({ name, ...props }: DynamicIconProps) {
  const IconComponent = (
    LucideIcons as unknown as Record<string, React.ComponentType<LucideProps>>
  )[name];

  if (!IconComponent) {
    console.warn(`Icon "${name}" not found`);
    return null;
  }

  return <IconComponent {...props} />;
}
