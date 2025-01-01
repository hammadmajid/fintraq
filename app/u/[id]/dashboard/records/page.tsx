import { Metadata } from "next/types";
import { RecordsTable } from "@/components/records/table";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRecords } from "@/actions/records";
import { CreateRecord } from "@/components/records/create-record";
import { getAllAccounts } from "@/actions/account";

export const metadata: Metadata = {
  title: "Records",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const accounts = await getAllAccounts(userId);
  const records = await getRecords(userId);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Records</h1>
          <p className="mb-6 text-muted-foreground">
            Create or manage your transactional records
          </p>
        </div>
        <CreateRecord accounts={accounts} />
      </div>
      {accounts.length == 0 || records.length == 0 ? (
        <p>No records</p>
      ) : (
        <RecordsTable records={records} />
      )}
    </main>
  );
}
