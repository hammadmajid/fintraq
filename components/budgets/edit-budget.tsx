"use client";

import { SelectBankAccount, SelectBudget } from "@/drizzle/db/schema";
import { BudgetForm } from "./budget-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { budgetSchema } from "@/lib/forms/budget";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBudget, editBudget } from "@/actions/budgets";

interface EditBudgetProps {
  budget: SelectBudget;
  accounts: SelectBankAccount[];
}

export function EditBudget({ budget, accounts }: EditBudgetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      id: budget.id,
      userId: budget.userId,
      account: budget.account,
      title: budget.title,
      description: budget.description,
      goal: Number(budget.goal),
      startsAt: budget.startsAt,
      endsAt: budget.endsAt,
    },
  });

  async function onSubmitAction(data: z.infer<typeof budgetSchema>) {
    setIsLoading(true);

    const result = await editBudget(data);

    if (result.success) {
      toast({
        title: "Budget edited",
        description: "Your budget has been successfully edited.",
      });
      router.push("/u/dashboard/budgets");
      router.refresh();
    } else {
      toast({
        title: "Error editing budget",
        description: result.message,
        variant: "destructive",
      });
    }

    setIsLoading(false);
  }

  return (
    <BudgetForm
      accounts={accounts}
      form={form}
      onSubmit={onSubmitAction}
      isLoading={isLoading}
    />
  );
}
