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
import { SelectAccount } from "@/lib/db/schema";
import { Edit, MoreVertical, Trash2 } from "lucide-react";

interface AccountCardProps {
  account: SelectAccount;
}

export default function AccountCard({ account }: AccountCardProps) {
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
              <DropdownMenuItem>
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
