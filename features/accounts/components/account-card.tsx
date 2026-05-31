"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PencilIcon } from "lucide-react"
import type { bankAccounts } from "@/lib/db/schemas/accounts-schema"

interface AccountCardProps {
  account: typeof bankAccounts.$inferSelect
  onEditClick: () => void
}

// Map icon names to lucide components
const iconMap: Record<string, React.ReactNode> = {
  Wallet: "👛",
  CreditCard: "💳",
  PiggyBank: "🐷",
  DollarSign: "$",
  Banknote: "💵",
  Coins: "🪙",
  Receipt: "🧾",
  Landmark: "🏛️",
  Building: "🏢",
  CircleDollarSign: "💰",
}

export function AccountCard({ account, onEditClick }: AccountCardProps) {
  const icon = iconMap[account.icon] || "💰"

  return (
    <Card className="flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <Link href={`/accounts/${account.id}`} className="flex-1 hover:opacity-80">
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center w-10 h-10 rounded-lg text-xl"
              style={{ backgroundColor: `${account.color}20` }}
            >
              {icon}
            </div>
            <div>
              <CardTitle className="text-base">{account.title}</CardTitle>
              <p className="text-sm text-muted-foreground">{account.type}</p>
            </div>
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={onEditClick}
          className="shrink-0"
        >
          <PencilIcon className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {account.description}
        </p>
      </CardContent>
    </Card>
  )
}
