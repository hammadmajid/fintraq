import { getAllAccounts } from "@/actions/account";
import { AccountCard } from "@/components/account/account-card";

export async function AccountsList({ userId }: { userId: string }) {
  const accounts = await getAllAccounts(userId);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {accounts.length !== 0 ? (
        accounts.map((account) => (
          <AccountCard account={account} key={account.id} />
        ))
      ) : (
        <p>No accounts yet...</p>
      )}
    </div>
  );
}
