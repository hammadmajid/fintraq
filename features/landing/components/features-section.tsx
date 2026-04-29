import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  BarChart3,
  Lock,
  RefreshCw,
  Smartphone,
  Target,
  Zap,
} from "lucide-react"

const features = [
  {
    title: "Invoice Management",
    description: "Create professional invoices, track payments, and send reminders to clients automatically.",
    icon: BarChart3,
  },
  {
    title: "Bank-Level Security",
    description: "Your data is encrypted and secured with enterprise-grade protection.",
    icon: Lock,
  },
  {
    title: "Multi-Project Tracking",
    description: "Organize income and expenses by project, client, or category.",
    icon: RefreshCw,
  },
  {
    title: "Simplified Tax Prep",
    description: "Auto-categorize expenses and generate tax reports. Deductible expenses at a glance.",
    icon: Target,
  },
  {
    title: "Mobile & Desktop",
    description: "Manage your finances anywhere, anytime on any device.",
    icon: Smartphone,
  },
  {
    title: "Income Tracking",
    description: "Monitor all income streams, invoices, and earnings in one place.",
    icon: Zap,
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full py-16">
      <div className="mb-12 text-center">
         <h2 className="mb-4 text-3xl font-bold md:text-4xl" id="features">
           Tools Built for Freelancers
         </h2>
         <p className="text-lg text-muted-foreground">
           Everything you need to manage your personal finances and grow your freelance business
         </p>
       </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-0 blur-xl transition-opacity group-hover:opacity-10"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <feature.icon />
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
