"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { SelectBankAccount, SelectRecord } from "@/drizzle/db/schema";
import { EditRecord } from "./edit-record";

interface RecordsTableProps {
  records: SelectRecord[];
  accounts: SelectBankAccount[];
}

export function RecordsTable({ records, accounts }: RecordsTableProps) {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>{record.amount}</TableCell>
              <TableCell>{record.type}</TableCell>
              <TableCell>{record.createdAt.toLocaleString()}</TableCell>
              <TableCell>{record.category}</TableCell>
              <TableCell>{record.status}</TableCell>
              <TableCell>
                <EditRecord record={record} accounts={accounts} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
