"use client";

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { AccountFormDialog } from "@/features/accounts/components/account-form-dialog"
import { AccountCard } from "@/features/accounts/components/account-card"
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty"
import type { bankAccounts } from "@/lib/db/schemas/accounts-schema"
import { useRouter } from "next/navigation"

interface AccountsPageProps {
    initialAccounts: (typeof bankAccounts.$inferSelect)[]
    userId: string
}

export function AccountsPageClient({ initialAccounts, userId }: AccountsPageProps) {
    const router = useRouter()
    const [accounts, setAccounts] = useState<
        (typeof bankAccounts.$inferSelect)[]
    >(initialAccounts)
    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [editingAccount, setEditingAccount] = useState<
        typeof bankAccounts.$inferSelect | undefined
    >(undefined)

    const handleOpenDialog = () => {
        setEditingAccount(undefined)
        setDialogOpen(true)
    }

    const handleEditClick = (account: typeof bankAccounts.$inferSelect) => {
        setEditingAccount(account)
        setDialogOpen(true)
    }

    const handleSuccess = () => {
        router.refresh()
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Accounts</h1>
                    <p className="text-muted-foreground mt-1">
                        Manage your bank accounts and financial accounts
                    </p>
                </div>
                <Button onClick={handleOpenDialog}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Account
                </Button>
            </div>

            {/* Content */}
            {accounts.length === 0 ? (
                <Empty>
                    <EmptyHeader>
                        <EmptyTitle>No accounts yet</EmptyTitle>
                        <EmptyDescription>
                            Create your first account to start tracking your finances.
                        </EmptyDescription>
                    </EmptyHeader>
                    <Button onClick={handleOpenDialog}>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Account
                    </Button>
                </Empty>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {accounts.map((account) => (
                        <AccountCard
                            key={account.id}
                            account={account}
                            onEditClick={() => handleEditClick(account)}
                        />
                    ))}
                </div>
            )}

            {/* Dialog */}
            <AccountFormDialog
                open={dialogOpen}
                onOpenChange={setDialogOpen}
                account={editingAccount}
                onSuccess={handleSuccess}
            />
        </div>
    )
}
