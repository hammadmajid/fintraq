"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, WalletCards } from "lucide-react";
import Link from "next/link";

export function Header() {
  interface Link {
    text: string;
    href: string;
  }

  const links: Link[] = [
    {
      text: "Features",
      href: "/#features",
    },
    {
      text: "FAQs",
      href: "/#faqs",
    },
    {
      text: "About",
      href: "/about",
    },
  ];

  return (
    <header className="container p-4 mx-auto mb-4 border-b">
      <nav className="flex flex-row items-center justify-between gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
        <FintraqLogo />
        <ul className="flex-row items-center justify-center hidden md:flex">
          {links.map((link) => {
            return (
              <li key={link.text}>
                <Button variant="ghost" asChild>
                  <Link href={link.href}>{link.text}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Button variant="ghost" asChild size="icon">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <FintraqLogo />
              </SheetTitle>
              <SheetDescription asChild>
                <ul className="flex flex-col items-start">
                  {links.map((link) => {
                    return (
                      <li key={link.text}>
                        <Button className="p-0" variant="ghost" asChild>
                          <Link href={link.href}>{link.text}</Link>
                        </Button>
                      </li>
                    );
                  })}
                </ul>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}

function FintraqLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-semibold md:text-base"
    >
      <WalletCards className="w-6 h-6" />
      <span>Fintraq</span>
    </Link>
  );
}
