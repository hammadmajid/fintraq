"use client";

import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "@/components/responsive-dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { recordQueries } from "@/lib/db/queries/records";
import type { SelectAccount } from "@/lib/db/schema";
import { recordSchema } from "@/lib/schemas/record";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import RecordForm from "./record-form";

interface CreateRecordProps {
  accounts: SelectAccount[];
}

export default function CreateRecord({ accounts }: CreateRecordProps) {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof recordSchema>>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      amount: 0,
      category: "Transportation",
      status: "Cleared",
      type: "Income",
      account: accounts[0].id,
      created: new Date(),
      updated: new Date(),
    },
  });

  async function onSubmit({
    account,
    amount,
    category,
    status,
    type,
  }: z.infer<typeof recordSchema>) {
    console.log("here")
    setIsLoading(true);

    try {
      await recordQueries.create(
        account,
        String(amount),
        category,
        type,
        status
      );

      toast({
        title: "Record Created",
        description: "Your new record has been successfully created.",
      });

      form.reset();
      setOpen(false);
      router.refresh();
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
            onSubmit={onSubmit}
          />
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
}
