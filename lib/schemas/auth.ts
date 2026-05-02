import * as z from "zod"

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name must be at most 50 characters."),
  email: z.email("Please enter a valid email address."),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters.")
    .max(100, "Password must be at most 100 characters."),
})

export type SignupFormData = z.infer<typeof signupSchema>
