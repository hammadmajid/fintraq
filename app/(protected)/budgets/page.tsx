import { UnderConstruction } from "@/components/under-construction"
import { PiggyBank } from "lucide-react"

export default function BudgetsPage() {
  return (
    <UnderConstruction
      title="Budgets"
      description="Create and manage budgets for different spending categories. Track your spending against budget goals and get insights on your financial health."
      icon={PiggyBank}
    />
  )
}
