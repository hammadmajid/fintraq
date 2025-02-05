"use client";

import { DynamicIcon } from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button";
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { accountSchema as accountSchema } from "@/lib/forms/account";
import { icons } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { bankAccountTypes } from "@/lib/utils";

const colors = [
  { name: "Red", value: "#dc2626" },
  { name: "Green", value: "#ea580c" },
  { name: "Blue", value: "#22c55e" },
  { name: "Yellow", value: "#3b82f6" },
  { name: "Purple", value: "#facc15" },
  { name: "Orange", value: "#6d28d9" },
];

interface AccountFormProps {
  form: UseFormReturn<z.infer<typeof accountSchema>>;
  isLoading: boolean;
  onSubmit: (values: z.infer<typeof accountSchema>) => Promise<void>;
}

export default function AccountForm({
  form,
  isLoading,
  onSubmit,
}: AccountFormProps) {
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
                <Input placeholder="Paypal, Venmo etc" {...field} />
              </FormControl>
              <FormDescription>
                The title of your account e.g. Paypal, Bank of America etc.
              </FormDescription>
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
                <Textarea placeholder="Enter account description" {...field} />
              </FormControl>
              <FormDescription>Description of your account.</FormDescription>
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
                  {bankAccountTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>Select type of your account.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-2"
                >
                  {colors.map((color) => (
                    <FormItem key={color.value}>
                      <FormControl>
                        <RadioGroupItem
                          value={color.value}
                          id={color.value}
                          className="sr-only peer"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={color.value}
                        style={{ backgroundColor: color.value }}
                        className={`h-8 w-8 block rounded-full border-2 peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-primary peer-aria-checked:ring-offset-1`}
                      />
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Choose a color for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-wrap gap-2"
                >
                  {icons.map((name) => (
                    <FormItem key={name}>
                      <FormControl>
                        <RadioGroupItem
                          value={name}
                          id={name}
                          className="sr-only peer"
                        />
                      </FormControl>
                      <FormLabel
                        htmlFor={name}
                        className="flex items-center justify-center w-10 h-10 border-2 rounded-full border-muted peer-aria-checked:border-primary peer-aria-checked:ring-1 peer-aria-checked:ring-primary peer-aria-checked:ring-offset-1"
                      >
                        <DynamicIcon name={name} />
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormDescription>
                Choose an icon for your account.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Saving....
            </>
          ) : (
            "Save"
          )}
        </Button>
      </form>
    </Form>
  );
}
