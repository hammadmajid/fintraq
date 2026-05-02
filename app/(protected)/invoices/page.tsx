import { UnderConstruction } from "@/components/under-construction"
import { FileText } from "lucide-react"

export default function InvoicesPage() {
  return (
    <UnderConstruction
      title="Invoices"
      description="Create, send, and manage invoices for your clients. Track payment status, generate reports, and automate your invoicing workflow."
      icon={FileText}
    />
  )
}
