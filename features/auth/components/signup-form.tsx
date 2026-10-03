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
import { signUp } from "@/lib/auth-client"
import { signupSchema, type SignupFormData } from "@/lib/schemas/auth"
import { AuthError, AuthPanel } from "./auth-shell"
import { PasswordInput } from "./password-input"

export function SignupForm() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: SignupFormData) => {
    setError(null)

    const callbackURL = `${window.location.origin}/dashboard`

    try {
      const { error: signUpError } = await signUp.email({
        name: data.name,
        email: data.email,
        password: data.password,
        callbackURL,
      })

      if (signUpError) {
        setError(signUpError.message ?? "Unable to create an account.")
        return
      }

      router.push("/dashboard")
    } catch {
      setError("Unable to create an account right now.")
    }
  }

  return (
    <AuthPanel
      label="NEW OPERATOR // 02"
      footer={
        <>
          <span>HAVE AN ACCOUNT?</span>
          <Link href="/login" className="cyber-text-link">
            SIGN IN <span aria-hidden="true">→</span>
          </Link>
        </>
      }
    >
      <form className="auth-form" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="name" className="cyber-label">
                  <span>01</span> FULL NAME
                </FieldLabel>
                <Input
                  {...field}
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Jamie Rivera"
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
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="email" className="cyber-label">
                  <span>02</span> EMAIL
                </FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
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
                <FieldLabel htmlFor="password" className="cyber-label">
                  <span>03</span> PASSWORD
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
        </FieldGroup>
        {error ? (
          <AuthError title="ACCOUNT CREATION FAILED" message={error} />
        ) : null}
        <Button
          type="submit"
          className="cyber-button auth-submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? "CREATING ACCOUNT…" : "CREATE ACCOUNT"}
          <span aria-hidden="true">↘</span>
        </Button>
      </form>
    </AuthPanel>
  )
}
