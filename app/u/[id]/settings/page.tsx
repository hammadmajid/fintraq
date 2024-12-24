import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  User,
  CreditCard,
  Shield,
  Palette,
  WalletCardsIcon,
} from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
};

export default function Settings() {
  const settingsLinks = [
    {
      title: "Profile",
      description: "Manage how your profile appears to others",
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
      title: "Account",
      description: "Manage your account settings and preferences",
      href: "/settings/account",
      icon: CreditCard,
    },
    {
      title: "Security",
      description: "Manage your security preferences",
      href: "/settings/security",
      icon: Shield,
    },
    {
      title: "Appearance",
      description: "Customize the look and feel of the application",
      href: "/settings/appearance",
      icon: Palette,
    },
  ];

  return (
    <main>
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
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
  );
}
