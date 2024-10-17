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
import apiClient from "@/lib/api-client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signUpForm } from "@/lib/schemas/auth/signUp";
import { Github } from "lucide-react";

export default function SignUpForm() {
  const router = useRouter();

  const form = useForm<z.infer<typeof signUpForm>>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpForm>) {
    const { email, password } = values;
    try {
      const response = await apiClient.post("/auth/register", {
        email,
        password,
      });

      console.log(response.data.session);

      localStorage.setItem("session", JSON.stringify(response.data));
      router.push("/profile");
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error("Error data:", error.response.data);
          console.error("Error status:", error.response.status);
        } else if (error.request) {
          console.error("Error request:", error.request);
        } else {
          console.error("Error message:", error.message);
        }
      } else {
        console.error("Unexpected error:", error);
      }
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
          Sign up
        </Button>
        <Button variant="outline" disabled className="w-full">
          <Github className="w-4 h-4 mr-2" /> GitHub
        </Button>
      </form>
    </Form>
  );
}
