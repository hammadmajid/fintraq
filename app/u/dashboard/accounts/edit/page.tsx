import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { EditAccount } from "@/components/account/edit-account";
import { getAccountById } from "@/actions/account";
import { DeleteBankAccount } from "@/components/account/delete-account";

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
    <main className="p-12 space-y-2">
      <EditAccount account={account} />
      <DeleteBankAccount id={accountId} />
    </main>
  );
}
