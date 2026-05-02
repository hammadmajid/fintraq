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
import { signUp } from "@/lib/auth-client"
import { signupSchema, type SignupFormData } from "@/lib/schemas/auth"

export default function SignupPage() {
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

    const callbackURL = `${window.location.origin}/`

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
    } catch (err) {
      setError("Unable to create an account right now.")
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
            <form
              className="flex flex-col gap-6"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FieldGroup>
                <Controller
                  name="name"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="name">Full name</FieldLabel>
                      <Input
                        {...field}
                        id="name"
                        type="text"
                        autoComplete="name"
                        placeholder="Jamie Rivera"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
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
                        autoComplete="new-password"
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
                  <AlertTitle>Account creation failed</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting
                  ? "Creating account..."
                  : "Create account"}
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
