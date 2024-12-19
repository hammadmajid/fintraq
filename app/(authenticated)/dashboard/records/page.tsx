import { getUserId } from "@/app/utils";
import { accountQueries } from "@/lib/db/queries/accounts";
import { Metadata } from "next";
import CreateRecord from "./components/create-record";
import RecordsTable from "./components/records-table";
import type { SelectRecord } from "@/lib/db/schema";
import { recordQueries } from "@/lib/db/queries/records";

export const metadata: Metadata = {
  title: "Records",
};

export default async function Records() {
  const userId = await getUserId();
  const accounts = await accountQueries.getByUserId(userId);

  let records: SelectRecord[] = [];

  for (const account of accounts) {
    const accountRecords = await recordQueries.getByAccountId(account.id);
    records = [...records, ...accountRecords];
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Records</h1>
          <p className="text-muted-foreground mb-6">
            Create or manage your records
          </p>
        </div>
        <CreateRecord accounts={accounts} />
      </div>
      <RecordsTable records={records} />
    </main>
  );
}
