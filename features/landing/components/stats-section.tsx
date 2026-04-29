import { BarChart3, Users, TrendingUp } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "5,000+",
    label: "Active Users",
  },
  {
    icon: TrendingUp,
    value: "$50M+",
    label: "Assets Managed",
  },
  {
    icon: BarChart3,
    value: "99.9%",
    label: "Uptime SLA",
  },
]

export function StatsSection() {
  return (
    <section className="w-full py-16">
      <div className="grid gap-8 md:grid-cols-3">
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <stat.icon className="mb-4 size-10 text-primary" />
            <div className="text-3xl font-bold md:text-4xl">{stat.value}</div>
            <div className="mt-2 text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
