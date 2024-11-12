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
import { Moon, Sun, User2, LogOut, RefreshCcw } from "lucide-react";
import type { SelectUser } from "@/lib/db/schema";
import { useToast } from "@/hooks/use-toast";

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

  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/v1/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        router.push("/signin");
      } else {
        toast({
          title: "Logout Error",
          description: "Logout failed. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Logout Error",
        description: "An error occurred during logout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleSync = () => {
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-9 h-9 hover:cursor-pointer">
          <AvatarImage src={user.avatarURL || ""} alt={user.fullName} />
          <AvatarFallback>
            <User2 size={24} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-semibold">
          <User2 className="mr-2" />
          {user.fullName}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
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
        <DropdownMenuItem onClick={handleSync}>
          <RefreshCcw className="mr-2" />
          Sync
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
