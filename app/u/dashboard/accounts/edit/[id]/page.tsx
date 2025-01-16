import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { EditAccount } from "@/components/account/edit-account";
import { getAccountById } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Edit account",
};

export default async function EditAccountsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const [account] = await getAccountById(id);

  return (
    <main className="p-12 space-y-2">
      <EditAccount account={account} />
      <Button variant="destructive" asChild>
        <Link
          className="block w-full"
          href={`/u/dashboard/accounts/delete/${id}`}
        >
          Delete
        </Link>
      </Button>
    </main>
  );
}
