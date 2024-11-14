"use client";

import { useState } from "react";
import { Edit2 } from "lucide-react";
import AccountForm from "./account-form";
import { z } from "zod";
import { accountSchema } from "@/lib/schemas/account";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
} from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";

interface EditAccountProps {
  id: string;
  account: z.infer<typeof accountSchema>;
}

export default function EditAccount({ id, account }: EditAccountProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      userId: account.userId,
      title: account.title,
      type: account.type,
      balance: account.balance,
      color: account.color,
      icon: account.icon,
      description: account.description,
    },
  });

  async function onSubmit(values: z.infer<typeof accountSchema>) {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/account/`,
        {
          body: JSON.stringify({ accountId: id, ...values }),
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(
          data.error || "An error occurred during account update."
        );
      }

      toast({
        title: "Account Updated",
        description: "Your account has been successfully updated.",
      });

      setOpen(false);
      router.refresh();
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
  return (
    <>
      <Button onClick={() => setOpen(true)} variant={"outline"} size="sm">
        <Edit2 />
        Edit
      </Button>
      <ResponsiveDialog open={open} onOpenChange={setOpen}>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit Account</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Change your account information below.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogContent>
          <AccountForm form={form} isLoading={isLoading} onSubmit={onSubmit} />
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
}
