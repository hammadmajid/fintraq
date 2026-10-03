import type { Metadata } from "next"

import { AuthShell } from "@/features/auth/components/auth-shell"
import { SignupForm } from "@/features/auth/components/signup-form"

export const metadata: Metadata = {
  title: "Create account — FinTraq",
}

export default function SignupPage() {
  return (
    <AuthShell
      kicker="FINTRAQ ACCESS // 02"
      title="Initialize workspace"
      lede="One profile, and every invoice, client, budget, and tax reserve indexed into a single command center."
      telemetry={[
        ["INVOICES", "TRACKED"],
        ["CASHFLOW", "INDEXED"],
        ["TAX RESERVE", "ARMED"],
      ]}
      index="002 // 003"
    >
      <SignupForm />
    </AuthShell>
  )
}
