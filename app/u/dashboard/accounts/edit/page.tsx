import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { EditAccount } from "@/components/account/edit-account";
import { getAccountById } from "@/actions/account";
import { DeleteBankAccount } from "@/components/account/delete-account";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { X } from "lucide-react";

export const metadata: Metadata = {
  title: "Edit account",
};

export default async function EditAccountsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;

  const accountId = resolvedSearchParams.id as string;
  const [account] = await getAccountById(accountId);

  if (!account) {
    return <div>Invalid id</div>;
  }

  return (
    <main className="pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create</h1>
          <p className="mb-6 text-muted-foreground">
            Add new transaction record.
          </p>
        </div>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/u/dashboard/accounts">
            <X />
            Cancel
          </Link>
        </Button>
      </div>
      <div className="grid gap-2">
        <EditAccount account={account} />
        <DeleteBankAccount id={accountId} />
      </div>
    </main>
  );
}
