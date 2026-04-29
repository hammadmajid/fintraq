"use client"

import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, WalletCards } from "lucide-react"
import Link from "next/link"

export function Header() {
  interface Link {
    text: string
    href: string
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
      text: "FAQs",
      href: "/#faqs",
    },
  ]

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <FintraqLogo />

          <div className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Button 
                key={link.text}
                variant="ghost" 
                size="sm" 
                render={<Link href={link.href} />}
                className="text-sm font-medium"
              >
                {link.text}
              </Button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
              render={<Link href="/login" />}
            >
              Sign In
            </Button>
            <Button
              size="sm"
              render={<Link href="/signup" />}
            >
              Get Started
            </Button>

            <Sheet>
              <SheetTrigger className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>
                    <FintraqLogo />
                  </SheetTitle>
                  <SheetDescription>
                    <ul className="flex flex-col items-start gap-2 pt-6">
                      {links.map((link) => {
                        return (
                          <li key={link.text} className="w-full">
                            <Button className="w-full justify-start p-0" variant="ghost">
                              <Link href={link.href}>{link.text}</Link>
                            </Button>
                          </li>
                        )
                      })}
                      <li className="w-full border-t pt-4 mt-4">
                        <Button
                          className="w-full"
                          variant="outline"
                          render={<Link href="/login" />}
                        >
                          Sign In
                        </Button>
                      </li>
                      <li className="w-full">
                        <Button
                          className="w-full mt-2"
                          render={<Link href="/signup" />}
                        >
                          Get Started
                        </Button>
                      </li>
                    </ul>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </div>
    </header>
  )
}

function FintraqLogo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-semibold md:text-base"
    >
      <WalletCards />
      <span>Fintraq</span>
    </Link>
  )
}
