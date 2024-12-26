"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Moon, RefreshCcw, Sun, User2 } from "lucide-react";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface UserMenuProps {
  user: User;
  id: string;
}

export function UserMenu({ user }: UserMenuProps) {
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

  const handleSync = () => {
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="w-7 h-7 hover:cursor-pointer">
          <AvatarImage src={user.image || ""} alt={user.name || " avatar"} />
          <AvatarFallback>
            <User2 size={24} />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="font-semibold">
          <Link
            href={`/u/${user.id}/settings/profile`}
            className="flex items-end"
          >
            <User2 className="mr-2" />
            {user.name}
          </Link>
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
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
