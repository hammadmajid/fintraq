import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Metadata } from "next";
import { ThemeController } from "@/components/settings/theme-controller";

export const metadata: Metadata = {
  title: "Appearance",
};

export default function AppearanceSetting() {
  return (
    <main>
      <div className="mb-4">
        <h1 className="text-xl font-bold mb-2">Appearance</h1>
        <p className="text-muted-foreground">
          Customize the look and feel of the application
        </p>
      </div>

      <div className="space-y-6">
        <ThemeController />
        <div>
          <h2 className="font-semibold mb-2">Language</h2>
          <Select disabled>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select a language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="fr">Français</SelectItem>
              <SelectItem value="de">Deutsch</SelectItem>
              <SelectItem value="es">Español</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </main>
  );
}
