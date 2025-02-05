"use client";

import { RecordsDataTable } from "./data-table";
import type { SelectRecord, SelectBankAccount } from "@/drizzle/db/schema";

interface RecordsTableProps {
  records: SelectRecord[];
  accounts: SelectBankAccount[];
}

export function RecordsTable({ records, accounts }: RecordsTableProps) {
  return <RecordsDataTable records={records} accounts={accounts} />;
}
