"use client";

import DynamicIcon from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { SelectAccount } from "@/lib/db/schema";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import EditAccount from "./edit-account";

interface AccountCardProps {
  account: SelectAccount;
}

export default function Component({ account }: AccountCardProps) {
  const router = useRouter();
  const { toast } = useToast();

  async function handleDeletion(id: string) {
    try {
      const response = await fetch("/api/v1/account", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ accountId: id }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "An error occurred during deletion.");
      }
    } catch (error) {
      toast({
        title: "Deletion Error",
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
    router.refresh();
  }

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <DynamicIcon name={account.icon} className="mr-2 h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold">{account.title}</h2>
              <p className="text-sm text-muted-foreground">
                {account.type} Account
              </p>
            </div>
          </div>
          <p className="text-3xl font-bold">${account.balance}</p>
        </div>
      </CardContent>
      <CardFooter className="">
        <div className="flex justify-end gap-1 w-full">
          <EditAccount
            id={account.id}
            account={{
              ...account,
              type: account.type as "Checking" | "Saving",
              description: account.description ?? undefined,
              balance: Number(account.balance),
            }}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleDeletion(account.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
