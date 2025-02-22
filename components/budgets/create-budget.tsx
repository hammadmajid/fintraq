"use client";

import { SelectBankAccount } from "@/drizzle/db/schema";
import { BudgetForm } from "./budget-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { budgetSchema } from "@/lib/forms/budget";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBudget } from "@/actions/budgets";

interface CreateBudgetProps {
  accounts: SelectBankAccount[];
}

export function CreateBudget({ accounts }: CreateBudgetProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof budgetSchema>>({
    resolver: zodResolver(budgetSchema),
    defaultValues: {
      userId: accounts[0].userId,
      startsAt: new Date(),
      account: accounts[0].id,
    },
  });

  async function onSubmitAction(data: z.infer<typeof budgetSchema>) {
    setIsLoading(true);

    const result = await createBudget(data);

    if (result.success) {
      toast({
        title: "Budget created",
        description: "Your budget has been successfully created.",
      });
      router.push("/budgets");
      router.refresh();
    } else {
      toast({
        title: "Error creating budget",
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
