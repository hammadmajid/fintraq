import { getAccountsByUserId } from "@/features/accounts/actions"
import { getServerSession } from "@/lib/auth-helpers"
import { AccountsPageClient } from "@/features/accounts/components/account-page"

// Server component wrapper
export default async function AccountsPage() {
  const session = await getServerSession()

  if (!session?.user?.id) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-muted-foreground">Please log in to view accounts</p>
      </div>
    )
  }

  const result = await getAccountsByUserId(session.user.id)
  const initialAccounts = result.success ? result.data ?? [] : []

  return (
    <AccountsPageClient initialAccounts={initialAccounts} userId={session.user.id} />
  )
}
