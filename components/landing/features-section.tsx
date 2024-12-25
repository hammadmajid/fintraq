import {
  UserCheck,
  LayoutDashboard,
  Wallet,
  Receipt,
  Smartphone,
  FileText,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "User Authentication",
    description: "Secure sign-up and login functionality.",
    icon: UserCheck,
  },
  {
    title: "Dashboard",
    description: "Get a quick glance at your finances with informative charts.",
    icon: LayoutDashboard,
  },
  {
    title: "Multiple Accounts",
    description: "Track your expenses across multiple accounts.",
    icon: Wallet,
  },
  {
    title: "Track Expenses",
    description: "Easily log and categorize your expenses.",
    icon: Receipt,
  },
  {
    title: "Responsive Design",
    description: "Optimized for both desktop and mobile use.",
    icon: Smartphone,
  },
  {
    title: "Reports",
    description: "Generate PDF of your finances to share with others.",
    icon: FileText,
  },
];

export function FeaturesSection() {
  return (
    <section className="w-full">
      <h2 className="text-3xl font-bold mb-8 text-center" id="features">
        Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card
            key={index}
            className="group relative overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="absolute inset-0 bg-purple-600 opacity-0 blur-xl transition-opacity group-hover:opacity-10"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <feature.icon className="h-6 w-6" />
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
  );
}
