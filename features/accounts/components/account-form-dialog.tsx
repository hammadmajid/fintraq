"use client"

import React, { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
  FieldDescription,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  createAccountSchema,
  type CreateAccountFormData,
} from "@/features/accounts/schemas/accounts"
import {
  createAccountAction,
  updateAccountAction,
} from "@/features/accounts/actions"
import type { bankAccounts } from "@/lib/db/schemas/accounts-schema"

const ICON_OPTIONS = [
  "Wallet",
  "CreditCard",
  "PiggyBank",
  "DollarSign",
  "Banknote",
  "Coins",
  "Receipt",
  "Landmark",
  "Building",
  "CircleDollarSign",
] as const

const TYPE_OPTIONS = [
  "Cash",
  "Checking",
  "Savings",
  "Credit",
  "Debit",
  "Investment",
  "Loan",
  "Other",
] as const

interface AccountFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  account?: typeof bankAccounts.$inferSelect
  onSuccess: () => void
}

export function AccountFormDialog({
  open,
  onOpenChange,
  account,
  onSuccess,
}: AccountFormDialogProps) {
  const [error, setError] = React.useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  const form = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      title: "",
      description: "",
      icon: "Wallet",
      color: "#b8ff2c",
      type: "Checking",
    },
  })

  // Update form values when editing an account
  useEffect(() => {
    if (account && open) {
      form.reset({
        title: account.title,
        description: account.description,
        icon: account.icon,
        color: account.color,
        type: account.type,
      })
    } else if (!account && open) {
      form.reset({
        title: "",
        description: "",
        icon: "Wallet",
        color: "#b8ff2c",
        type: "Checking",
      })
    }
  }, [account, open, form])

  const onSubmit = async (data: CreateAccountFormData) => {
    setError(null)
    setIsSubmitting(true)

    try {
      let result

      if (account) {
        // Update existing account
        result = await updateAccountAction(account.id, data)
      } else {
        // Create new account
        result = await createAccountAction(data)
      }

      if (!result.success) {
        setError(result.error || "Something went wrong")
        setIsSubmitting(false)
        return
      }

      onOpenChange(false)
      onSuccess()
    } catch (err) {
      console.error("Error submitting form:", err)
      setError("An unexpected error occurred")
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {account ? "Edit Account" : "Create New Account"}
          </DialogTitle>
          <DialogDescription>
            {account
              ? "Update your account details"
              : "Add a new bank account to track your finances"}
          </DialogDescription>
        </DialogHeader>

        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FieldGroup>
            <Controller
              name="title"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="title">Account Name</FieldLabel>
                  <Input
                    {...field}
                    id="title"
                    placeholder="My Checking Account"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="description"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="description">Description</FieldLabel>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Add notes about this account..."
                    className="min-h-25"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <Controller
                name="icon"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="icon">Icon</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="icon"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ICON_OPTIONS.map((icon) => (
                          <SelectItem key={icon} value={icon}>
                            {icon}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                name="type"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="type">Account Type</FieldLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger
                        id="type"
                        aria-invalid={fieldState.invalid}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {TYPE_OPTIONS.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <Controller
              name="color"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="color">Color</FieldLabel>
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      id="color"
                      type="color"
                      className="w-16 h-10 p-1 cursor-pointer"
                      aria-invalid={fieldState.invalid}
                    />
                    <Input
                      {...field}
                      placeholder="#b8ff2c"
                      className="flex-1"
                      aria-invalid={fieldState.invalid}
                    />
                  </div>
                  <FieldDescription>
                    Choose a color for this account
                  </FieldDescription>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          {error && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="flex gap-2 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? account
                  ? "Updating..."
                  : "Creating..."
                : account
                  ? "Update Account"
                  : "Create Account"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
