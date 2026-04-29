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
    title: "Real-Time Dashboard",
    description: "See your financial position at a glance with interactive charts and KPIs.",
    icon: BarChart3,
  },
  {
    title: "Bank-Level Security",
    description: "Your data is encrypted and secured with enterprise-grade protection.",
    icon: Lock,
  },
  {
    title: "Multi-Account Management",
    description: "Manage all business accounts and track cash flow in one place.",
    icon: RefreshCw,
  },
  {
    title: "Smart Budget Planning",
    description: "Set budgets, track spending, and get alerts when you're approaching limits.",
    icon: Target,
  },
  {
    title: "Mobile & Desktop",
    description: "Manage your finances anywhere, anytime on any device.",
    icon: Smartphone,
  },
  {
    title: "Instant Expense Tracking",
    description: "Log, categorize, and tag expenses in seconds.",
    icon: Zap,
  },
]

export function FeaturesSection() {
  return (
    <section className="w-full py-16">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl" id="features">
          Powerful Features for Business Growth
        </h2>
        <p className="text-lg text-muted-foreground">
          Everything you need to manage your business finances in one platform
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
