"use client";

import { updateCurrency } from "@/actions/preferences";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "@/hooks/use-toast";
import { cn, CURRENCY_CACHE_KEY } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { currencies } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const FormSchema = z.object({
  currency: z.string({
    required_error: "Please select a currency.",
  }),
});

export function ChangeCurrency({
  userId,
  currency,
}: {
  userId: string;
  currency: string;
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      currency,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      await updateCurrency(userId, data.currency);
      localStorage.setItem(
        CURRENCY_CACHE_KEY,
        JSON.stringify({ userId, currency: data.currency }),
      );
      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Failed to store currency preference.",
      });
    }

    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Currency</CardTitle>
        <CardDescription>Change you default currency.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel className="sr-only">Currency</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          {field.value
                            ? currencies.find(
                                (currency) => currency.value === field.value,
                              )?.label
                            : "Select currency"}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search currency..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No currency found.</CommandEmpty>
                          <CommandGroup>
                            {currencies.map((currency) => (
                              <CommandItem
                                value={currency.label}
                                key={currency.value}
                                onSelect={() => {
                                  form.setValue("currency", currency.value);
                                }}
                              >
                                {currency.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    currency.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormDescription className="sr-only">
                    This is the currency that will be used in the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
