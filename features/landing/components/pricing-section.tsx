"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Check } from "lucide-react"
import Link from "next/link"

const plans = [
  {
    name: "Free",
    description: "Perfect for trying Fintraq",
    monthlyPrice: 0,
    annualPrice: 0,
    features: [
      "Up to 3 bank accounts",
      "Basic invoice tracking",
      "Expense categorization",
      "Monthly reports",
      "Community support",
      "Mobile app access",
    ],
  },
  {
    name: "Starter",
    description: "Perfect for freelancers just starting out",
    monthlyPrice: 9,
    annualPrice: 90,
    popular: true,
    features: [
      "Up to 10 bank accounts",
      "Invoice creation & tracking",
      "Advanced expense categorization",
      "Monthly financial reports",
      "Email support",
      "Mobile app access",
      "Multi-currency support",
    ],
  },
  {
    name: "Professional",
    description: "For established freelancers and self-employed pros",
    monthlyPrice: 29,
    annualPrice: 290,
    features: [
      "Unlimited bank accounts",
      "Advanced invoice management",
      "Multi-project income tracking",
      "Tax preparation reports",
      "Automated expense categorization",
      "Priority support",
      "Mobile app access",
      "Client portal",
      "Advanced income analytics",
    ],
  },
]

export function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(false)

  return (
    <section className="w-full py-24">
      <div className="mb-12 text-center">
         <h2 className="mb-4 text-3xl font-bold md:text-4xl">Affordable Pricing for Solo Creators</h2>
         <p className="mb-8 text-lg text-muted-foreground">
           Choose the plan that fits your freelance journey. All plans include a 14-day free trial.
         </p>

        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm ${!isAnnual ? "font-semibold" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <Switch checked={isAnnual} onCheckedChange={setIsAnnual} />
          <div className="flex items-center gap-2">
            <span className={`text-sm ${isAnnual ? "font-semibold" : "text-muted-foreground"}`}>
              Annually
            </span>
            <Badge variant="secondary">Save 17%</Badge>
          </div>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
         {plans.map((plan, index) => (
          <Card
            key={index}
            className={`relative flex flex-col transition-all ${
              plan.popular ? "border-primary shadow-lg md:scale-105" : ""
            }`}
          >
            {plan.popular && (
              <div className="absolute inset-0 -z-10 rounded-lg bg-[var(--gradient-primary)] opacity-10 blur-xl"></div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-1 flex-col gap-6">
              <div>
                <div className="mb-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    {isAnnual ? "/year" : "/month"}
                  </span>
                </div>
                {isAnnual && (
                  <p className="text-sm text-muted-foreground">
                    ${(plan.annualPrice / 12).toFixed(2)}/month billed annually
                  </p>
                )}
              </div>

               <Button
                 size="lg"
                 className="w-full"
                 variant={plan.popular ? "default" : "outline"}
                 render={<Link href={plan.monthlyPrice === 0 ? "/signup" : "/signup"} />}
               >
                 {plan.monthlyPrice === 0 ? "Get Started Free" : "Start Free Trial"}
               </Button>

              <ul className="flex flex-1 flex-col gap-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-5 flex-shrink-0 text-primary" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 rounded-lg bg-card/50 p-6 text-center">
         <p className="mb-2 text-sm font-medium text-muted-foreground">Need a custom plan?</p>
         <p className="mb-4 text-lg">
           For specific requirements or team collaboration needs, let's chat about what works best for you.
         </p>
         <Button variant="outline" render={<a href="mailto:hello@fintraq.tech" />}>
           Contact Us
         </Button>
       </div>
    </section>
  )
}
