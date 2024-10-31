"use client";

import {
  ArrowRightLeft,
  ChevronUp,
  HandCoins,
  Home,
  Landmark,
  User2,
  WalletCards,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "./ui/button";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Records",
    url: "/dashboard/records",
    icon: ArrowRightLeft,
  },
  {
    title: "Accounts",
    url: "/dashboard/accounts",
    icon: Landmark,
  },
  {
    title: "Budgets",
    url: "/dashboard/budgets",
    icon: HandCoins,
  },
];

export function AppSidebar({ userName }: { userName: string }) {
  const router = useRouter();
  const { toast } = useToast();

  async function signOut() {
    try {
      const response = await fetch("/api/v1/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Sign Out Error",
        description: "An error occurred while signing out. Please try again.",
        variant: "destructive",
      });
    }
  }
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="p-2">
            <Link
              href="/"
              className="flex items-center gap-2 text-lg font-semibold md:text-base"
            >
              <WalletCards className="h-6 w-6" />
              <span>Fintraq</span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {userName}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <Button variant="ghost" className="w-full">
                    <Link href="/settings" className="w-full">Settings</Link>
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button onClick={signOut} variant="ghost" className="w-full">
                    Sign out
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
