import { icons } from "@/lib/utils";
import { bankAccountTypes } from "@/lib/utils";
import { z } from "zod";

export const accountSchema = z.object({
  userId: z.string(),
  title: z.string().min(1, "Enter at least 1 character"),
  color: z
    .string()
    .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, "Invalid hex color code"),
  type: z.enum(bankAccountTypes, { message: "Invalid account type" }),
  icon: z.enum(icons, { message: "Invalid icon" }),
  description: z.string().min(1, "Enter at least 1 character"),
  balance: z.number().default(0),
});
