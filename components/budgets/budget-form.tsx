"use client";

import { budgetSchema } from "@/lib/forms/budget";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { SelectBankAccount } from "@/drizzle/db/schema";
import { cn } from "@/lib/utils";
import { Calendar } from "../ui/calendar";

interface BudgetFormProps {
  accounts: SelectBankAccount[];
  form: UseFormReturn<z.infer<typeof budgetSchema>>;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof budgetSchema>) => Promise<void>;
}

export function BudgetForm({
  accounts,
  form,
  isLoading,
  onSubmit,
}: BudgetFormProps) {
  const [selectedAccount, setSelectedAccount] = useState<SelectBankAccount>();
  const watchedAccount = form.watch("account");

  useEffect(() => {
    const account = accounts.find((acc) => acc.id === form.watch("account"));
    setSelectedAccount(account);
  }, [watchedAccount, accounts, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Food budget" {...field} />
              </FormControl>
              <FormDescription>Enter a title for your budget.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter budget description" {...field} />
              </FormControl>
              <FormDescription>Description of your account.</FormDescription>
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
              <Select
                onValueChange={(value) => {
                  field.onChange(value);
                  const account = accounts.find((acc) => acc.id === value);
                  setSelectedAccount(account);
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account">
                      {selectedAccount ? (
                        <div className="flex gap-2 items-center">
                          <DynamicIcon
                            name={selectedAccount.icon}
                            className="w-5"
                          />
                          <p>{selectedAccount.title}</p>
                        </div>
                      ) : (
                        <p>Select account</p>
                      )}
                    </SelectValue>
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {accounts.map((account) => (
                    <SelectItem key={account.id} value={account.id}>
                      <div className="flex gap-2 items-center">
                        <DynamicIcon name={account.icon} className="w-5" />
                        <span>{account.title}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select associated account.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="goal"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Goal</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormDescription>Enter the goal amount.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endsAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground",
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    initialFocus
                    disabled={(date) =>
                      date <= new Date() || date < new Date("1900-01-01")
                    }
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Select the end date for the budget.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full mt-6" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save />
              Save
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
