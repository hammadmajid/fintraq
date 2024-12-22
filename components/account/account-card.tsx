"use client";

import DynamicIcon from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SelectBankAccount } from "@/drizzle/db/schema";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccount, editAccount } from "@/actions/account";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogDescription,
} from "@/components/responsive-dialog";
import AccountForm from "./account-form";
import { useState } from "react";
import { accountSchema } from "@/lib/forms/account";
import { z } from "zod";

interface AccountCardProps {
  account: SelectBankAccount;
}

export default function Component({ account }: AccountCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  async function handleDeletion(id: string) {
    try {
      await deleteAccount(id);
      setOpen(false);
    } catch (error) {
      toast({
        title: "Deletion Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
    router.refresh();
  }

  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof accountSchema>>({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      userId: account.userId,
      title: account.title,
      type: account.type as "Checking" | "Saving" | undefined,
      balance: parseFloat(account.balance),
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
      <Button
        onClick={() => setOpen(true)}
        className="h-max hover:cursor-pointer block"
        variant="outline"
        asChild
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <DynamicIcon name={account.icon} className="mr-2 h-6 w-6" />
                <div>
                  <h2 className="text-xl font-bold">{account.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {account.type} Account
                  </p>
                </div>
              </div>
              <p className="text-3xl font-bold">${account.balance}</p>
            </div>
          </CardContent>
          <CardFooter></CardFooter>
        </Card>
      </Button>
      <ResponsiveDialog open={open} onOpenChange={setOpen}>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit Account</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Change your account information below.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogContent>
          <div className="grid gap-4 px-2">
            <AccountForm
              form={form}
              isLoading={isLoading}
              onSubmit={onSubmit}
            />
            <Button
              variant="destructive"
              onClick={() => handleDeletion(account.id)}
            >
              <Trash2 />
              Delete account
            </Button>
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
}
