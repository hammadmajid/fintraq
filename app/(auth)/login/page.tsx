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
import { signIn } from "@/lib/auth-client"
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth"

export default function LoginPage() {
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

      router.push("/")
    } catch (err) {
      setError("Unable to sign in right now.")
    }
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
                    <FieldLabel htmlFor="password">Password</FieldLabel>
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
    </div>
  )
}
