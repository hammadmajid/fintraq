import { z } from "zod"

export const accountSchema = z.object({
    userId: z.string(),
    title: z.string().min(1, "Enter at least 1 character"),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Invalid hex color code"),
    type: z.enum(["Checking", "Saving"], { message: "Invalid account type" }),
    icon: z.string().min(1, "Icon is required"),
    description: z.string().optional(),
    balance: z.number().default(0),
})
