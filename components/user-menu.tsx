"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, User2, LogOut, HelpCircle } from "lucide-react";
import type { SelectUser } from "@/lib/db/schema";

export default function UserMenu({ user }: { user: SelectUser }) {
  const { setTheme, theme } = useTheme();
  const router = useRouter();

  const handleThemeChange = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/signin"); // Redirect to login page after successful logout
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const handleHelp = () => {
    router.push("/help");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-10 h-10 hover:cursor-pointer">
          <AvatarImage src={user.avatarURL || ""} alt={user.fullName} />
          <AvatarFallback>
            <User2 size={24} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleThemeChange}>
          {theme === "light" ? (
            <Sun className="mr-2" />
          ) : theme === "dark" ? (
            <Moon className="mr-2" />
          ) : (
            <Sun className="mr-2" />
          )}
          {theme === "system" ? "System" : theme === "dark" ? "Dark" : "Light"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleHelp}>
          <HelpCircle className="mr-2" />
          Help
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
