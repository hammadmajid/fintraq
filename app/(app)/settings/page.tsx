import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Palette, User, WalletCardsIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Settings() {
  const settingsLinks = [
    {
      title: "Profile",
      description: "Manage how your profile and account settings",
      href: "/settings/profile",
      icon: User,
    },
    {
      title: "Billing",
      description: "Manage your subscription and payment methods",
      href: "/settings/billing",
      icon: WalletCardsIcon,
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of the application",
      href: "/settings/appearance",
      icon: Palette,
    },
  ];

  return (
    <div className="flex flex-col justify-between h-full pb-8">
      <main>
        <h1 className="mb-4 text-3xl font-bold">Settings</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {settingsLinks.map((link) => (
            <Link key={link.href} href={link.href} className="block">
              <Card className="h-full transition-colors hover:bg-muted/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <link.icon className="w-5 h-5" />
                    <span>{link.title}</span>
                  </CardTitle>
                  <CardDescription>{link.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
      <div className="text-center">
        <Button variant="link" asChild>
          <Link
            href="https://github.com/hammadmajid/fintraq"
            className="flex gap-2"
          >
            <Github />
            <span>hammadmajid/fintraq</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
