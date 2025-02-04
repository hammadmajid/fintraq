"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Edit } from "lucide-react";
import { Link } from "next-view-transitions";
import type { SelectRecord, SelectBankAccount } from "@/drizzle/db/schema";
import { ArrowUpDown } from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { getRelativeTime } from "@/lib/utils";

export const createColumns = (
  accounts: SelectBankAccount[],
): ColumnDef<SelectRecord>[] => [
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Amount
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      // TODO: get the currency from preferences table
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="font-medium px-4">{formatted}</div>;
    },
  },
  {
    accessorKey: "account",
    header: "Account",
    cell: ({ row }) => {
      const record = row.original;
      const account = accounts.find((acc) => acc.id === record.account)!;
      return (
        <div className="flex gap-2 items-center">
          <DynamicIcon name={account.icon} className="w-5" />
          {account.title}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <HoverCard>
          <HoverCardTrigger>
            <div className="mx-4">
              {row.original.createdAt.toLocaleString()}
            </div>
          </HoverCardTrigger>
          <HoverCardContent>
            {getRelativeTime(row.original.createdAt)}
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const record = row.original;
      return (
        <Button variant="outline" size="icon" asChild>
          <Link href={`/u/dashboard/records/edit?id=${record.id}`}>
            <Edit className="w-4 h-4" />
          </Link>
        </Button>
      );
    },
  },
];
