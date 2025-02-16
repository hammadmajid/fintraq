import { z } from "zod";

export const budgetSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  account: z.string(),
  goal: z.number(),
  title: z.string(),
  description: z.string(),
  startsAt: z.date(),
  endsAt: z.date(),
});
