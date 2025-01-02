"use client";

import { SelectBankAccount, SelectRecord } from "@/drizzle/db/schema";
import { useToast } from "@/hooks/use-toast";
import { recordSchema } from "@/lib/forms/record";
import { zodResolver } from "@hookform/resolvers/zod";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  ResponsiveDialog,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
} from "../responsive-dialog";
import { Button } from "../ui/button";
import { RecordForm } from "./record-form";
import { editRecord } from "@/actions/records";

interface EditAccoutProps {
  record: SelectRecord;
  accounts: SelectBankAccount[];
}

export function EditRecord({ record, accounts }: EditAccoutProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof recordSchema>>({
    resolver: zodResolver(recordSchema),
    defaultValues: {
      ...record,
      amount: Number(record.amount),
      created: record.createdAt,
    },
  });

  async function onSubmit(data: z.infer<typeof recordSchema>) {
    setIsLoading(true);

    const result = await editRecord(data);

    if (result.success) {
      toast({
        title: "Successfull",
        description: result.message,
      });
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }

    setOpen(false);
    router.refresh();
  }

  function handleDeletion(id: string): void {
    throw new Error("Function not implemented.");
  }

  return (
    <>
      <Button onClick={() => setOpen(true)} variant="outline" size="icon">
        <Edit className="w-4 h-4" />
      </Button>

      <ResponsiveDialog open={open} onOpenChange={setOpen}>
        <ResponsiveDialogHeader>
          <ResponsiveDialogTitle>Edit Account</ResponsiveDialogTitle>
          <ResponsiveDialogDescription>
            Change your account information below.
          </ResponsiveDialogDescription>
        </ResponsiveDialogHeader>
        <ResponsiveDialogContent>
          <div className="grid gap-4">
            <RecordForm
              accounts={accounts}
              form={form}
              isLoading={isLoading}
              onSubmitAction={onSubmit}
            />
            <Button
              variant="destructive"
              onClick={() => handleDeletion(record.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete account
            </Button>
          </div>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </>
  );
}
