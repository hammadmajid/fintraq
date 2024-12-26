import { getAllAccounts } from "@/actions/account";
import { AccountCard } from "@/components/account/account-card";
import { CreateAccount } from "@/components/account/create-account";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Accounts",
};

export default async function AccountsPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const accounts = await getAllAccounts(session.user.id);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="mb-6 text-muted-foreground">
            Create or manage your accounts
          </p>
        </div>
        <CreateAccount userId={session.user.id} />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {accounts.length !== 0 ? (
          accounts.map((account) => (
            <AccountCard account={account} key={account.id} />
          ))
        ) : (
          <p>No accounts yet...</p>
        )}
      </div>
    </main>
  );
}
