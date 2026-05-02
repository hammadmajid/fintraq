"use client"

import { Button, buttonVariants } from "@/components/ui/button"
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

          <div className="hidden items-center gap-1 lg:flex">
            {links.map((link) => (
              <Link
                key={link.text}
                href={link.href}
                className={buttonVariants({ variant: "ghost", size: "sm" }) + " text-sm font-medium"}
              >
                {link.text}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className={buttonVariants({ variant: "outline", size: "sm" }) + " hidden sm:inline-flex"}
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className={buttonVariants({ size: "sm" })}
            >
              Get Started
            </Link>

            <Sheet>
              <SheetTrigger className={buttonVariants({ variant: "ghost", size: "icon" }) + " lg:hidden"}>
                <Menu />
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
                             <Link
                               href={link.href}
                               className={buttonVariants({ variant: "ghost" }) + " w-full justify-start p-0"}
                             >
                               {link.text}
                             </Link>
                           </li>
                         )
                       })}
                       <li className="mt-4 w-full border-t pt-4">
                         <Link
                           href="/login"
                           className={buttonVariants({ variant: "outline" }) + " w-full block"}
                         >
                           Sign In
                         </Link>
                       </li>
                       <li className="w-full">
                         <Link
                           href="/signup"
                           className={buttonVariants() + " mt-2 w-full block"}
                         >
                           Get Started
                         </Link>
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
