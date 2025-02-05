"use client";

import { editAccount } from "@/actions/account";
import { useToast } from "@/hooks/use-toast";
import { accountSchema } from "@/lib/forms/account";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import AccountForm from "./account-form";
import { SelectBankAccount } from "@/drizzle/db/schema";

export function EditAccount({ account }: { account: SelectBankAccount }) {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      id: account.id,
      userId: account.userId,
      title: account.title,
      type: account.type,
      color: account.color,
      icon: account.icon,
      description: account.description ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof accountSchema>) {
    setIsLoading(true);
    try {
      await editAccount(values);
      toast({
        title: "Account Updated",
        description: "Your account has been successfully updated.",
      });
      router.push("/u/dashboard/accounts");
    } catch (error) {
      toast({
        title: "Account Update Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return <AccountForm form={form} isLoading={isLoading} onSubmit={onSubmit} />;
}
