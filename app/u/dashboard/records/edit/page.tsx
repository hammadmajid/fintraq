import { Metadata } from "next/types";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getRecordById } from "@/actions/records";
import { getAllAccounts } from "@/actions/account";
import { EditRecord } from "@/components/records/edit-record";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "next-view-transitions";
import { DeleteRecord } from "@/components/records/delete-record";

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
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Edit</h1>
          <p className="mb-6 text-muted-foreground">
            Update the details of this record.
          </p>
        </div>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/u/dashboard/records">
            <X />
            Cancel
          </Link>
        </Button>
      </div>
      <div className="grid gap-2">
        <EditRecord accounts={accounts} record={record} />
        <DeleteRecord id={recordId} />
      </div>
    </main>
  );
}
