import type { Metadata } from "next"

import { AuthShell } from "@/features/auth/components/auth-shell"
import { LoginForm } from "@/features/auth/components/login-form"

export const metadata: Metadata = {
  title: "Sign in — FinTraq",
}

export default function LoginPage() {
  return (
    <AuthShell
      kicker="FINTRAQ ACCESS // 01"
      title="Resume session"
      lede="Pick up where you left off — cashflow, invoices, and tax reserves, exactly as you left them."
      telemetry={[
        ["CHANNEL", "ENCRYPTED"],
        ["SESSION", "STANDBY"],
        ["LEDGER", "LOCKED"],
      ]}
      index="001 // 003"
    >
      <LoginForm />
    </AuthShell>
  )
}
