"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, ChevronsUpDown, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
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
import { useRouter } from "next/navigation";
import { storePreferencce } from "./action";
import { useState } from "react";

const currencies = [
  { label: "USD - United States Dollar", value: "USD" },
  { label: "EUR - Euro", value: "EUR" },
  { label: "JPY - Japanese Yen", value: "JPY" },
  { label: "GBP - British Pound Sterling", value: "GBP" },
  { label: "AUD - Australian Dollar", value: "AUD" },
  { label: "CAD - Canadian Dollar", value: "CAD" },
  { label: "CHF - Swiss Franc", value: "CHF" },
  { label: "CNY - Chinese Yuan", value: "CNY" },
  { label: "SEK - Swedish Krona", value: "SEK" },
  { label: "NZD - New Zealand Dollar", value: "NZD" },
  { label: "PKR - Pakistani Rupee", value: "PKR" },
  { label: "MXN - Mexican Peso", value: "MXN" },
  { label: "SGD - Singapore Dollar", value: "SGD" },
  { label: "HKD - Hong Kong Dollar", value: "HKD" },
  { label: "NOK - Norwegian Krone", value: "NOK" },
  { label: "KRW - South Korean Won", value: "KRW" },
  { label: "TRY - Turkish Lira", value: "TRY" },
  { label: "RUB - Russian Ruble", value: "RUB" },
  { label: "INR - Indian Rupee", value: "INR" },
  { label: "BRL - Brazilian Real", value: "BRL" },
  { label: "ZAR - South African Rand", value: "ZAR" },
] as const;

const FormSchema = z.object({
  currency: z.string({
    required_error: "Please select a currency.",
  }),
});

export function CurrencySelector({ userId }: { userId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    try {
      await storePreferencce(userId, data.currency);
      router.push("/onboard/step/2");
    } catch {
      toast({
        title: "Error",
        description: "Failed to store currency preference.",
      });
    }
  }

  return (
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
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? currencies.find(
                            (currency) => currency.value === field.value
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
                                  : "opacity-0"
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
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
}
