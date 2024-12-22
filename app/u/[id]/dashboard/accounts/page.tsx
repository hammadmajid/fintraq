import { Metadata } from "next/types";
import CreateAccount from "@/components/account/create-account";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Accounts",
};

export default async function AccountsPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Accounts</h1>
          <p className="text-muted-foreground mb-6">
            Create or manage your accounts
          </p>
        </div>
        <CreateAccount userId={session.user.id} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* {accounts.length !== 0 ? (
          accounts.map((account) => (
            <AccountCard account={account} key={account.id} />
          ))
        ) : (
          <p>No accounts yet...</p>
        )} */}
      </div>
    </main>
  );
}
