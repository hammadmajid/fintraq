import { UnderConstruction } from "@/components/under-construction"
import { Landmark } from "lucide-react"

export default function AccountDetailPage({
  params,
}: {
  params: { id: string }
}) {
  return (
    <UnderConstruction
      title="Account Details"
      description="View and manage the details of your bank account. Coming soon: transactions, balance history, and more."
      icon={Landmark}
    />
  )
}
