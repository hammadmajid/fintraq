"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { signIn } from "@/lib/auth-client"

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (!email || !password) {
      setError("Email and password are required.")
      return
    }

    setIsSubmitting(true)
    const callbackURL = `${window.location.origin}/`

    try {
      const { error: signInError } = await signIn.email({
        email,
        password,
        callbackURL,
      })

      if (signInError) {
        setError(signInError.message ?? "Unable to sign in.")
        return
      }

      router.push("/")
    } catch (err) {
      setError("Unable to sign in right now.")
    } finally {
      setIsSubmitting(false)
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
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@studio.com"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </Field>
            </FieldGroup>
            {error ? (
              <Alert variant="destructive">
                <AlertTitle>Sign in failed</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            ) : null}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Sign in"}
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
