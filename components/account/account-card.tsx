"use client";

import {useState} from "react";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Trash2} from "lucide-react";
import {SelectBankAccount} from "@/drizzle/db/schema";
import {useToast} from "@/hooks/use-toast";
import {deleteAccount, editAccount} from "@/actions/account";
import {accountSchema} from "@/lib/forms/account";
import DynamicIcon from "@/components/dynamic-icon";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {
    ResponsiveDialog,
    ResponsiveDialogContent,
    ResponsiveDialogDescription,
    ResponsiveDialogHeader,
    ResponsiveDialogTitle,
} from "@/components/responsive-dialog";
import AccountForm from "./account-form";

interface AccountCardProps {
  account: SelectBankAccount;
}

export function AccountCard({account}: AccountCardProps) {
  const router = useRouter();
  const { toast } = useToast();
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

    async function handleDeletion(id: string) {
        try {
            await deleteAccount(id);
            setOpen(false);
            router.refresh();
        } catch (error) {
            toast({
                title: "Deletion Error",
                description:
                    error instanceof Error ? error.message : "An unknown error occurred",
                variant: "destructive",
            });
        }
    }

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
        className="h-max hover:cursor-pointer block w-full p-0"
        variant="outline"
        asChild
      >
          <Card className="relative overflow-hidden">
              <div
                  className="absolute inset-0 opacity-20 blur-xl transition-opacity"
                  style={{backgroundColor: account.color}}
              ></div>
              <CardHeader>
                  <CardTitle className="flex items-center">
                      <DynamicIcon
                          name={account.icon}
                          className="mr-2 h-8 w-8"
                          style={{color: account.color}}
                      />
                      <h2 className="text-lg font-bold">
                          {account.title}
                      </h2>
                  </CardTitle>
                  <CardDescription>{account.type} Account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                  <p className="text-3xl font-extrabold">${account.balance}</p>
                  <p className="text-sm">{account.description}</p>
          </CardContent>
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
                <Trash2 className="mr-2 h-4 w-4"/>
              Delete account
            </Button>
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
}
