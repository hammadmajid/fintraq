"use client";

import { useState, useCallback } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, ArrowUpDown, Edit, Trash2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Records",
};

type Record = {
  id: string;
  amount: number;
  type: "income" | "expense" | "transfer";
  date: string;
  category: string;
  status: "pending" | "cleared";
};

const initialRecords: Record[] = [
  {
    id: "1",
    amount: 1000,
    type: "income",
    date: "2023-06-01",
    category: "Salary",
    status: "cleared",
  },
  {
    id: "2",
    amount: -50,
    type: "expense",
    date: "2023-06-02",
    category: "Groceries",
    status: "cleared",
  },
  {
    id: "3",
    amount: 500,
    type: "transfer",
    date: "2023-06-03",
    category: "Savings",
    status: "pending",
  },
  {
    id: "4",
    amount: 200,
    type: "expense",
    date: "2023-06-04",
    category: "Utilities",
    status: "cleared",
  },
  {
    id: "5",
    amount: 150,
    type: "income",
    date: "2023-06-05",
    category: "Freelance",
    status: "pending",
  },
  {
    id: "6",
    amount: -75,
    type: "expense",
    date: "2023-06-06",
    category: "Dining",
    status: "cleared",
  },
  {
    id: "7",
    amount: 300,
    type: "transfer",
    date: "2023-06-07",
    category: "Investment",
    status: "pending",
  },
  {
    id: "8",
    amount: 500,
    type: "income",
    date: "2023-06-08",
    category: "Bonus",
    status: "cleared",
  },
  {
    id: "9",
    amount: -100,
    type: "expense",
    date: "2023-06-09",
    category: "Transport",
    status: "cleared",
  },
  {
    id: "10",
    amount: 250,
    type: "transfer",
    date: "2023-06-10",
    category: "Savings",
    status: "pending",
  },
  {
    id: "11",
    amount: 400,
    type: "income",
    date: "2023-06-11",
    category: "Gift",
    status: "cleared",
  },
  {
    id: "12",
    amount: -200,
    type: "expense",
    date: "2023-06-12",
    category: "Shopping",
    status: "cleared",
  },
  {
    id: "13",
    amount: 100,
    type: "transfer",
    date: "2023-06-13",
    category: "Emergency Fund",
    status: "pending",
  },
];

export default function Records() {
  const [records, setRecords] = useState<Record[]>(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<Set<string>>(
    new Set()
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Record;
    direction: "asc" | "desc";
  } | null>(null);

  const handleSort = (key: keyof Record) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig?.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  const sortedRecords = useCallback(() => {
    if (!sortConfig) return records;
    return [...records].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key])
        return sortConfig.direction === "asc" ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key])
        return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [records, sortConfig]);

  const filteredRecords = sortedRecords().filter((record) =>
    Object.values(record).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSelectAll = () => {
    if (selectedRecords.size === filteredRecords.length) {
      setSelectedRecords(new Set());
    } else {
      setSelectedRecords(new Set(filteredRecords.map((r) => r.id)));
    }
  };

  const handleSelectRecord = (id: string) => {
    const newSelected = new Set(selectedRecords);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedRecords(newSelected);
  };

  const handleBulkDelete = () => {
    setRecords(records.filter((record) => !selectedRecords.has(record.id)));
    setSelectedRecords(new Set());
  };

  const handleBulkStatusChange = (newStatus: "pending" | "cleared") => {
    setRecords(
      records.map((record) =>
        selectedRecords.has(record.id)
          ? { ...record, status: newStatus }
          : record
      )
    );
  };

  const handleDelete = (id: string) => {
    setRecords(records.filter((record) => record.id !== id));
  };

  return (
    <main>
      <h1 className="text-3xl font-bold mb-4">Records</h1>

      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search records..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        {selectedRecords.size > 0 && (
          <div className="space-x-2">
            <Button onClick={handleBulkDelete}>Delete Selected</Button>
            <Button onClick={() => handleBulkStatusChange("cleared")}>
              Mark as Cleared
            </Button>
            <Button onClick={() => handleBulkStatusChange("pending")}>
              Mark as Pending
            </Button>
          </div>
        )}
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={selectedRecords.size === filteredRecords.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
            <TableHead className="w-[100px]">
              <Button variant="ghost" onClick={() => handleSort("amount")}>
                Amount
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("type")}>
                Type
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("date")}>
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("category")}>
                Category
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" onClick={() => handleSort("status")}>
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="w-[50px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredRecords.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                <Checkbox
                  checked={selectedRecords.has(record.id)}
                  onCheckedChange={() => handleSelectRecord(record.id)}
                />
              </TableCell>
              <TableCell>{record.amount.toFixed(2)}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.date}</TableCell>
              <TableCell>{record.category}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => console.log("Edit", record.id)}
                    >
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(record.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </main>
  );
}
