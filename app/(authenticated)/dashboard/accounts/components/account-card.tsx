"use client";

import DynamicIcon from "@/components/dynamic-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { SelectAccount } from "@/lib/db/schema";
import { Edit, MoreVertical, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface AccountCardProps {
  account: SelectAccount;
}

export default function AccountCard({ account }: AccountCardProps) {
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
    <Card style={{ backgroundColor: account.color }}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <DynamicIcon name={account.icon} className="mr-2" />
            <h2 className="text-lg font-bold">{account.title}</h2>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDeletion(account.id)}>
                <Trash2 className="mr-2 h-4 w-4" />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <p className="mb-4">{account.description}</p>
        <p className="text-2xl font-bold">${account.balance}</p>
      </CardContent>
    </Card>
  );
}
