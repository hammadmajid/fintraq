"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { SelectBankAccount } from "@/drizzle/db/schema";
import { recordSchema } from "@/lib/forms/record";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { recordCategories, recordStatuses, recordTypes } from "@/lib/utils";

interface RecordFormProps {
  accounts: SelectBankAccount[];
  form: UseFormReturn<z.infer<typeof recordSchema>>;
  isLoading: boolean;
  onSubmitAction: (values: z.infer<typeof recordSchema>) => Promise<void>;
}

export function RecordForm({
  accounts,
  form,
  isLoading,
  onSubmitAction,
}: RecordFormProps) {
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitAction)}
        className="px-2 pb-6 space-y-4"
      >
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {recordCategories.map((category) => {
                    return (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription className="sr-only">
                Select the category of record.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {recordStatuses.map((category) => {
                    return (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription className="sr-only">
                Select the status of record.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {recordTypes.map((category) => {
                    return (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription className="sr-only">
                Select type of your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="account"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map((account) => {
                    return (
                      <SelectItem key={account.id} value={account.id}>
                        {account.title}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              <FormDescription className="sr-only">
                Select associated account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) => field.onChange(parseFloat(e.target.value))}
                />
              </FormControl>
              <FormDescription className="sr-only">
                Enter the amount.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="w-full mx-auto">
          <FormField
            control={form.control}
            name="created"
            render={({ field }) => (
              <FormItem className="w-full mx-auto">
                <FormLabel>Date</FormLabel>
                <Calendar
                  className="max-w-min mx-auto"
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
                <FormDescription className="sr-only">
                  The date of transaction.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting....
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
