"use client";

import { createRecord } from "@/actions/records";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { SelectBankAccount } from "@/drizzle/db/schema";
import { useToast } from "@/hooks/use-toast";
import { recordSchema } from "@/lib/forms/record";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RecordForm } from "./record-form";

interface CreateRecordProps {
  accounts: SelectBankAccount[];
}

export function CreateRecord({ accounts }: CreateRecordProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recordSchema>>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      userId: accounts[0].userId,
      amount: 0,
      category: "Other",
      status: "Completed",
      type: "Income",
      account: accounts[0].id,
    },
  });

  async function onSubmitAction(data: z.infer<typeof recordSchema>) {
    setIsLoading(true);

    try {
      const result = await createRecord(data);

      if (result.success) {
        toast({
          title: "Record Created",
          description: "Your new record has been successfully created.",
        });

        setOpen(false);
        form.reset();
        router.refresh();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Record Creation Error",
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
      <Button onClick={() => setOpen(true)} size="lg">
        <Plus />
        New
      </Button>
      <ResponsiveDialog open={open} onOpenChange={setOpen}>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Create Record</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Fill out the form to create new record.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogContent>
          <RecordForm
            accounts={accounts}
            form={form}
            isLoading={isLoading}
            onSubmitAction={onSubmitAction}
          />
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
}
