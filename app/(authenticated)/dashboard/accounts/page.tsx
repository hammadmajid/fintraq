import { getUserId } from "@/app/utils";
import { accountQueries } from "@/lib/db/queries/accounts";
import AccountCard from "./components/account-card";
import { Metadata } from "next";
import CreateAccount from "./components/create-account";

export const metadata: Metadata = {
  title: "Accounts",
};

export default async function Accounts() {
  const userId = await getUserId();
  const accounts = await accountQueries.getByUserId(userId);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Accounts</h1>
          <p className="text-muted-foreground mb-6">
            Create or manage your accounts
          </p>
        </div>
        <CreateAccount userId={userId} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
