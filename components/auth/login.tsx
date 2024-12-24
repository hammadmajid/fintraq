"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Mail } from "lucide-react";
import { SiGithub, SiGoogle } from "react-icons/si";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

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
    <div className="space-y-2">
      <form action={handleSubmit} className="space-y-2">
        <Input type="text" name="email" placeholder="Email" required />
        <Button className="w-full" type="submit" disabled={isLoading}>
          <Mail className="w-4 h-4 mr-2" />{" "}
          {isLoading ? "Sending..." : "Magic Link"}
        </Button>
      </form>
      <div className="py-2">
        <Separator />
      </div>
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
      <Button variant="outline" className="w-full" disabled>
        <SiGoogle className="w-4 h-4 mr-2" /> Google
      </Button>
    </div>
  );
}
