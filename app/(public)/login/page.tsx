"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { signIn, authClient } from "@/lib/auth-client"
import {
  loginSchema,
  type LoginFormData,
  forgotPasswordSchema,
  type ForgotPasswordFormData,
} from "@/lib/schemas/auth"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [forgotPasswordOpen, setForgotPasswordOpen] = React.useState(false)
  const [resetEmailSent, setResetEmailSent] = React.useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const forgotPasswordForm = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    setError(null)

    const callbackURL = `${window.location.origin}/`

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
    } catch (err) {
      setError("Unable to sign in right now.")
    }
  }

  const onForgotPasswordSubmit = async (data: ForgotPasswordFormData) => {
    try {
      const result = await authClient.requestPasswordReset({
        email: data.email,
        redirectTo: `${window.location.origin}/reset-password`,
      })

      // Show success message regardless of whether email exists (generic message for security)
      setResetEmailSent(true)
      forgotPasswordForm.reset()
    } catch (err) {
      console.error("Error requesting password reset:", err)
      // Still show success message for security
      setResetEmailSent(true)
      forgotPasswordForm.reset()
    }
  }

  const handleCloseForgotPassword = () => {
    setForgotPasswordOpen(false)
    setResetEmailSent(false)
  }

  return (
    <div className="min-h-screen">
      <Card className="mx-auto mt-22 max-w-lg">
        <CardHeader>
          <CardTitle>Sign in</CardTitle>
          <CardDescription>
            Use your email and password to access your workspace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="flex flex-col gap-6"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FieldGroup>
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@studio.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <div className="flex items-center justify-between">
                      <FieldLabel htmlFor="password">Password</FieldLabel>
                      <button
                        type="button"
                        onClick={() => setForgotPasswordOpen(true)}
                        className={buttonVariants({ variant: "link" })}
                      >
                        Forgot?
                      </button>
                    </div>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          Don't have an account?
          <Link className={buttonVariants({ variant: "link" })} href="/signup">
            Get started
          </Link>
        </CardFooter>
      </Card>

      <Dialog
        open={forgotPasswordOpen}
        onOpenChange={handleCloseForgotPassword}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset your password</DialogTitle>
            <DialogDescription>
              {resetEmailSent
                ? "Check your email for password reset instructions"
                : "Enter your email address and we'll send you a link to reset your password."}
            </DialogDescription>
          </DialogHeader>

          {!resetEmailSent ? (
            <form
              className="flex flex-col gap-4"
              onSubmit={forgotPasswordForm.handleSubmit(onForgotPasswordSubmit)}
            >
              <Controller
                name="email"
                control={forgotPasswordForm.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="reset-email">Email</FieldLabel>
                    <Input
                      {...field}
                      id="reset-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@studio.com"
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Button
                type="submit"
                disabled={forgotPasswordForm.formState.isSubmitting}
              >
                {forgotPasswordForm.formState.isSubmitting
                  ? "Sending..."
                  : "Send reset link"}
              </Button>
            </form>
          ) : (
            <div className="text-center text-sm text-muted-foreground">
              If an account exists with this email address, you will receive a
              password reset link shortly.
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
