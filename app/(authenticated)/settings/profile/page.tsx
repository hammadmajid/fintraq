"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function Profile() {
  const router = useRouter();
  const { toast } = useToast();
  const [isSigningOut, setIsSigningOut] = useState(false);

  async function signOut() {
    setIsSigningOut(true);
    try {
      const response = await fetch("/api/v1/auth/signout", {
        method: "POST",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to sign out");
      }

      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      });

      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.log(error);
      toast({
        title: "Sign Out Error",
        description: "An error occurred while signing out. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <main className="w-3/4 mx-auto space-y-12">
      <div>
        <h1 className="text-3xl font-bold">Profile</h1>
        <p>See and update your profile information.</p>
      </div>
      <div className="flex flex-col gap-2">
        <Button onClick={signOut} disabled={isSigningOut}>
          {isSigningOut ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing out...
            </>
          ) : (
            "Sign out"
          )}
        </Button>
        <Button variant="destructive" disabled>
          Delete account
        </Button>
      </div>
    </main>
  );
}
