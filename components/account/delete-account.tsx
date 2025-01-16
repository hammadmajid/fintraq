"use client";

import { deleteAccount } from "@/actions/account";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "../ui/button";
import { CardFooter } from "../ui/card";

export function DeleteBankAccount({ id }: { id: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit() {
    setIsLoading(true);

    try {
      await deleteAccount(id);
      router.push("/u/dashboard/accounts");
    } catch {
      toast({
        title: "Failed to delete account",
        description:
          "An unexpected error occured while performing this action. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <CardFooter className="grid gap-2">
      <Button
        variant="destructive"
        className="w-full"
        onClick={onSubmit}
        disabled={isLoading}
      >
        Confirm
      </Button>
      <Button
        variant="outline"
        onClick={() => {
          router.back();
        }}
      >
        Cancel
      </Button>
    </CardFooter>
  );
}
