"use client";

import { SelectBankAccount, SelectRecord } from "@/drizzle/db/schema";
import { useToast } from "@/hooks/use-toast";
import { recordSchema } from "@/lib/forms/record";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RecordForm } from "./record-form";
import { editRecord } from "@/actions/records";

interface EditAccoutProps {
  record: SelectRecord;
  accounts: SelectBankAccount[];
}

export function EditRecord({ record, accounts }: EditAccoutProps) {
  const router = useRouter();
  const { toast } = useToast();
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

    router.push("/records");
    router.refresh();
  }

  return (
    <RecordForm
      accounts={accounts}
      form={form}
      isLoading={isLoading}
      onSubmitAction={onSubmit}
    />
  );
}
