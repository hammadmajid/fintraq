import type { Metadata } from "next"
import { Suspense } from "react"

import { AuthPanel, AuthShell } from "@/features/auth/components/auth-shell"
import { ResetPasswordForm } from "@/features/auth/components/reset-password-form"

export const metadata: Metadata = {
  title: "Reset password — FinTraq",
}

export default function ResetPasswordPage() {
  return (
    <AuthShell
      kicker="FINTRAQ ACCESS // 03"
      title="Rotate credentials"
      lede="Set a new password for your workspace. Reset links expire, so use this one soon."
      telemetry={[
        ["CHANNEL", "ENCRYPTED"],
        ["TOKEN", "SINGLE USE"],
      ]}
      index="003 // 003"
    >
      <Suspense
        fallback={
          <AuthPanel label="RESET // 03">
            <p className="auth-loading">VERIFYING LINK…</p>
          </AuthPanel>
        }
      >
        <ResetPasswordForm />
      </Suspense>
    </AuthShell>
  )
}
