import { Metadata } from "next/types";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRecordById } from "@/actions/records";
import { getAllAccounts } from "@/actions/account";
import { EditRecord } from "@/components/records/edit-record";

export const metadata: Metadata = {
  title: "Edit record",
};

export default async function EditRecordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;

  const recordId = resolvedSearchParams.id as string;

  const userId = session.user.id;

  const accounts = await getAllAccounts(userId);
  const [record] = await getRecordById(recordId);

  return (
    <main className="p-12 space-y-2">
      <EditRecord accounts={accounts} record={record} />
    </main>
  );
}
