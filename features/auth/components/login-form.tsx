"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient, signIn } from "@/lib/auth-client"
import {
  forgotPasswordSchema,
  loginSchema,
  type ForgotPasswordFormData,
  type LoginFormData,
} from "@/lib/schemas/auth"
import { AuthError, AuthNotice, AuthPanel } from "./auth-shell"
import { PasswordInput } from "./password-input"

type Mode = "sign-in" | "recover"

export function LoginForm() {
  const [mode, setMode] = React.useState<Mode>("sign-in")
  const switched = React.useRef(false)

  const switchTo = (next: Mode) => {
    switched.current = true
    setMode(next)
  }

  return mode === "sign-in" ? (
    <SignInPanel
      autoFocus={switched.current}
      onForgot={() => switchTo("recover")}
    />
  ) : (
    <RecoverPanel onBack={() => switchTo("sign-in")} />
  )
}

function SignInPanel({
  autoFocus,
  onForgot,
}: {
  autoFocus: boolean
  onForgot: () => void
}) {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)

    const callbackURL = `${window.location.origin}/dashboard`

    try {
      const { error: signInError } = await signIn.email({
        email: data.email,
        password: data.password,
        callbackURL,
      })

      if (signInError) {
        setError(signInError.message ?? "Unable to sign in.")
        return
      }

      router.push("/dashboard")
    } catch {
      setError("Unable to sign in right now.")
    }
  }

  return (
    <AuthPanel
      label="SIGN IN // 01"
      footer={
        <>
          <span>NO ACCOUNT?</span>
          <Link href="/signup" className="cyber-text-link">
            GET STARTED <span aria-hidden="true">→</span>
          </Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className="cyber-label">
                  <span>01</span> EMAIL
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
                  autoFocus={autoFocus}
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
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <div className="cyber-label-row">
                  <FieldLabel htmlFor="password" className="cyber-label">
                    <span>02</span> PASSWORD
                  </FieldLabel>
                  <button
                    type="button"
                    className="cyber-inline-link"
                    onClick={onForgot}
                  >
                    FORGOT?
                  </button>
                </div>
                <PasswordInput
                  {...field}
                  id="password"
                  autoComplete="current-password"
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
        {error ? <AuthError title="SIGN-IN FAILED" message={error} /> : null}
        <Button
          type="submit"
          className="cyber-button auth-submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "SIGNING IN…" : "SIGN IN"}
          <span aria-hidden="true">↗</span>
        </Button>
      </form>
    </AuthPanel>
  )
}

function RecoverPanel({ onBack }: { onBack: () => void }) {
  const [sent, setSent] = React.useState(false)

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${window.location.origin}/reset-password`,
      })
    } catch (err) {
      // Show the same message either way so the form never reveals which emails exist.
      console.error("Error requesting password reset:", err)
    }
    setSent(true)
    form.reset()
  }

  return (
    <AuthPanel
      label="RECOVER // 01"
      footer={
        <button type="button" className="cyber-text-link" onClick={onBack}>
          <span aria-hidden="true">←</span> BACK TO SIGN IN
        </button>
      }
    >
      <div className="auth-panel-heading">
        <h2>Reset your password</h2>
        <p>
          Enter your account email and we&apos;ll send you a link to set a new
          password.
        </p>
      </div>
      {sent ? (
        <AuthNotice
          title="LINK DISPATCHED"
          message="If an account exists for that email, a reset link is on its way."
        />
      ) : (
        <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="reset-email" className="cyber-label">
                  <span>01</span> EMAIL
                </FieldLabel>
                <Input
                  {...field}
                  id="reset-email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
                  autoFocus
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
          <Button
            type="submit"
            className="cyber-button auth-submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "SENDING…" : "SEND RESET LINK"}
            <span aria-hidden="true">↗</span>
          </Button>
        </form>
      )}
    </AuthPanel>
  )
}
