import { z } from "zod";
import { recordCategories, recordStatuses, recordTypes } from "../utils";

export const recordSchema = z.object({
  id: z.string().optional(),
  userId: z.string(),
  amount: z.number(),
  type: z.enum(recordTypes),
  accountId: z.string(),
  category: z.enum(recordCategories),
  status: z.enum(recordStatuses),
  created: z.date(),
});
