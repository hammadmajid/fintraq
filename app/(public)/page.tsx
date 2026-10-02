import type { Metadata } from "next"
import { LandingPage } from "@/features/fintraq/components/landing-page"

export const metadata: Metadata = {
  title: "FinTraq — Cyber-Financial Terminal for Independent Operators",
  description: "A cyberpunk financial command center for freelancers and independent operators.",
  openGraph: {
    title: "FinTraq — Cyber-Financial Terminal",
    description: "Cashflow, invoices, budgets, accounts, and tax reserves in one sharper workspace.",
    type: "website",
    url: "https://fintraq.tech",
    siteName: "FinTraq",
  },
  twitter: { card: "summary_large_image", title: "FinTraq — Cyber-Financial Terminal", description: "A financial command center for independent operators." },
  robots: { index: true, follow: true },
}

export default function Page() {
  return <LandingPage />
}
