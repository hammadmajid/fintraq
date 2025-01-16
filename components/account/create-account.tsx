"use client";

import { useState } from "react";
import AccountForm from "./account-form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { accountSchema } from "@/lib/forms/account";
import { createAccount } from "@/actions/account";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export function CreateAccount({ userId }: { userId: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      userId,
      title: "",
      type: "Checking",
      balance: 0,
      color: "#dc2626",
      icon: "Wallet",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof accountSchema>) {
    setIsLoading(true);

    try {
      await createAccount(values);

      toast({
        title: "Account Created",
        description: "Your new account has been successfully created.",
      });

      form.reset();
      router.back();
      router.refresh();
    } catch (error) {
      toast({
        title: "Account Creation Error",
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
