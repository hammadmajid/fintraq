"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Appearance",
};

export default function AppearanceSetting() {
  const { setTheme, theme } = useTheme();

  return (
    <main>
      <div className="mb-4">
        <h1 className="text-3xl font-bold mb-2">Appearance Settings</h1>
        <p className="text-lg text-muted-foreground">
          Customize the look and feel of the application
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Theme</h2>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[200px] justify-start">
                {theme === "light" && <Sun className="mr-2 h-4 w-4" />}
                {theme === "dark" && <Moon className="mr-2 h-4 w-4" />}
                {theme === "system" && <Monitor className="mr-2 h-4 w-4" />}
                {theme
                  ? theme.charAt(0).toUpperCase() + theme.slice(1)
                  : "Select Theme"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" /> Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" /> Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Monitor className="mr-2 h-4 w-4" /> System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

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
