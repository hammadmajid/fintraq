"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { authClient } from "@/lib/auth-client"
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/schemas/auth"
import { AuthError, AuthNotice, AuthPanel } from "./auth-shell"
import { PasswordInput } from "./password-input"

const backToSignIn = (
  <Link href="/login" className="cyber-text-link">
    <span aria-hidden="true">←</span> BACK TO SIGN IN
  </Link>
)

export function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = React.useState<string | null>(null)
  const [success, setSuccess] = React.useState(false)

  const token = searchParams.get("token")

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (data: ResetPasswordFormData) => {
    setError(null)

    if (!token) {
      setError("Invalid or missing reset token")
      return
    }

    try {
      const result = await authClient.resetPassword({
        newPassword: data.password,
        token: token,
      })

      if (result.error) {
        setError(
          result.error.message ?? "Failed to reset password. Please try again."
        )
        return
      }

      setSuccess(true)
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (err) {
      console.error("Error resetting password:", err)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  if (!token) {
    return (
      <AuthPanel label="RESET // 03" footer={backToSignIn}>
        <AuthError
          title="INVALID LINK"
          message="This password reset link is invalid or has expired. Request a new one from the sign-in page."
        />
      </AuthPanel>
    )
  }

  if (success) {
    return (
      <AuthPanel label="RESET // 03">
        <AuthNotice
          title="CREDENTIALS ROTATED"
          message="Your password has been reset. Redirecting to sign in…"
        />
      </AuthPanel>
    )
  }

  return (
    <AuthPanel label="RESET // 03" footer={backToSignIn}>
      <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="password" className="cyber-label">
                  <span>01</span> NEW PASSWORD
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="password"
                  autoComplete="new-password"
                  placeholder="8+ characters"
                  className="cyber-input"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError
                    className="cyber-field-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmPassword" className="cyber-label">
                  <span>02</span> CONFIRM PASSWORD
                </FieldLabel>
                <PasswordInput
                  {...field}
                  id="confirmPassword"
                  autoComplete="new-password"
                  className="cyber-input"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError
                    className="cyber-field-error"
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />
        </FieldGroup>
        {error ? <AuthError title="RESET FAILED" message={error} /> : null}
        <Button
          type="submit"
          className="cyber-button auth-submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "RESETTING…" : "RESET PASSWORD"}
          <span aria-hidden="true">↗</span>
        </Button>
      </form>
    </AuthPanel>
  )
}
