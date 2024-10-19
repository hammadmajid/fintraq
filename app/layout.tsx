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
import type { Metadata } from "next";
import localFont from "next/font/local";
import Link from "next/link";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Fintraq",
    default: "Fintraq",
  },
  description: "A barebone, modern finance tracking app built with NextJs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col justify-between`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

function Header() {
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
      text: "Pricing",
      href: "/#pricing",
    },
    {
      text: "Help",
      href: "/#help",
    },
  ];

  return (
    <header className="p-4 bg-muted/40">
      <nav className="gap-6 text-lg font-medium flex flex-row items-center justify-between md:gap-5 md:text-sm lg:gap-6">
        <FintraqLogo />
        <ul className="hidden md:flex flex-row items-center justify-center">
          {links.map((link) => {
            return (
              <li key={link.text}>
                <Button variant="link" asChild>
                  <Link href={link.href}>{link.text}</Link>
                </Button>
              </li>
            );
          })}
        </ul>
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <FintraqLogo />
              </SheetTitle>
              <SheetDescription>
                <ul className="flex flex-col items-start">
                  {links.map((link) => {
                    return (
                      <li key={link.text}>
                        <Button className="p-0" variant="link" asChild>
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
      <WalletCards className="h-6 w-6" />
      <span>Fintraq</span>
    </Link>
  );
}

function Footer() {
  return (
    <footer className="p-12 text-center bg-muted/40">
      <p>
        Licensed under{" "}
        <Button className="p-0 " variant="link" asChild>
          <Link href="https://github.com/hammadmajid/fintraq/blob/main/LICENSE">
            MIT license
          </Link>
        </Button>
      </p>
    </footer>
  );
}
