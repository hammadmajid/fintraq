import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Metadata } from "next";
import ThemeController from "./components/theme-controller";

export const metadata: Metadata = {
  title: "Appearance",
};

export default function AppearanceSetting() {
  return (
    <main>
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Appearance Settings</h1>
        <p className="text-lg text-muted-foreground">
          Customize the look and feel of the application
        </p>
      </div>

      <ThemeController />

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Language</h2>
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
