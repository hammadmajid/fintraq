import { UnderConstruction } from "@/components/under-construction"
import { Home } from "lucide-react"

export default function DashboardPage() {
  return (
    <UnderConstruction
      title="Dashboard"
      description="Your central hub for financial overview. View account summaries, recent transactions, budget status, and key financial metrics at a glance."
      icon={Home}
    />
  )
}
