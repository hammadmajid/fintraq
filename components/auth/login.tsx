"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SiGithub, SiGoogle } from "react-icons/si";

interface LoginFormProps {
  onSubmit: (
    formData: FormData
  ) => Promise<{ success: boolean; error?: string }>;
  onGithubLogin: () => Promise<void>;
}

export function LoginForm({ onSubmit, onGithubLogin }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    setIsLoading(true);
    try {
      const result = await onSubmit(formData);
      if (result.success) {
        router.push("/login/sent");
      } else if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        });
      }
    } catch {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Hello, stranger!</CardTitle>
        <CardDescription>Choose your preferred login method</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form action={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="email"
            placeholder="Email"
            required
            className="w-full"
          />
          <Button className="w-full" type="submit" disabled={isLoading}>
            <Mail className="w-4 h-4 mr-2" />{" "}
            {isLoading ? "Sending..." : "Send Magic Link"}
          </Button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <form
            action={async () => {
              try {
                await onGithubLogin();
              } catch {
                toast({
                  title: "Error",
                  description: "Failed to login with GitHub. Please try again.",
                  variant: "destructive",
                });
              }
            }}
          >
            <Button variant="outline" className="w-full" type="submit">
              <SiGithub className="w-4 h-4 mr-2" /> GitHub
            </Button>
          </form>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {
              toast({
                title: "Not implemented yet",
                description:
                  "Google login is not implemented yet. Check back later.",
                variant: "destructive",
              });
            }}
          >
            <SiGoogle className="w-4 h-4 mr-2" /> Google
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
