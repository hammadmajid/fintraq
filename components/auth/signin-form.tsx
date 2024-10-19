"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
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
import { useRouter } from "next/navigation";
import { signInForm } from "@/lib/schemas/auth/zod";
import { Github } from "lucide-react";

export default function SignInForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signInForm>>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInForm>) {
    const { email, password } = values;
    try {
      const response = await fetch("/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      localStorage.setItem("session", JSON.stringify(response.json()));
      router.push("/profile");
      return;
    } catch (error) {
      console.error("Unexpected error:", error);
      return;
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                Your email address to verify your identity.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription className="sr-only">
                Minimum 6 characters password for security.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Sign in
        </Button>
        <Button variant="outline" disabled className="w-full">
          <Github className="w-4 h-4 mr-2" /> GitHub
        </Button>
      </form>
    </Form>
  );
}
