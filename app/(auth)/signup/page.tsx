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
import { signUp } from "@/lib/auth-client"

export default function SignupPage() {
  const router = useRouter()
  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const password = String(formData.get("password") ?? "")

    if (!name || !email || !password) {
      setError("Name, email, and password are required.")
      return
    }

    setIsSubmitting(true)
    const callbackURL = `${window.location.origin}/`

    try {
      const { error: signUpError } = await signUp.email({
        name,
        email,
        password,
        callbackURL,
      })

      if (signUpError) {
        setError(signUpError.message ?? "Unable to create an account.")
        return
      }

      router.push("/")
    } catch (err) {
      setError("Unable to create an account right now.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto grid min-h-screen max-w-xl grid-cols-1 items-center gap-10 px-6 py-12">
        <Card>
          <CardHeader>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Set up your profile and start tracking every invoice in one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">Full name</FieldLabel>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jamie Rivera"
                    required
                  />
                </Field>
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
                    autoComplete="new-password"
                    minLength={8}
                    required
                  />
                </Field>
              </FieldGroup>
              {error ? (
                <Alert variant="destructive">
                  <AlertTitle>Account creation failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="justify-center">
            Already have an account?
            <Link className={buttonVariants({ variant: "link" })} href="/login">
              Sign in
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
