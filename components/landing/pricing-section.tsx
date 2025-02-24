"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Check, X } from "lucide-react";
import Link from 'next/link';
import { useState } from "react";

const plans = [
  {
    name: "Hobbyist",
    description: "Perfect for personal use",
    price: { monthly: 0, yearly: 0 },
    features: [
      "Basic expense tracking",
      "Single account",
      "Monthly reports",
      "Mobile app access",
    ],
    notIncluded: [
      "Multiple accounts",
      "Advanced analytics",
      "Priority support",
    ],
  },
  {
    name: "Pro",
    description: "Ideal for freelancers and small businesses",
    price: { monthly: 4, yearly: 40 },
    features: [
      "Everything in Hobbyist",
      "Multiple accounts",
      "Advanced analytics",
      "Customizable categories",
    ],
    notIncluded: ["Priority support", "Team collaboration"],
  },
  {
    name: "Premium",
    description: "Best for growing businesses",
    price: { monthly: 10, yearly: 100 },
    features: [
      "Everything in Pro",
      "Priority support",
      "Team collaboration",
      "API access",
      "White-label reports",
    ],
    notIncluded: [],
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="w-full py-12">
      <h2 className="mb-8 text-3xl font-bold text-center" id="pricing">
        Pricing
      </h2>
      <div className="flex items-center justify-center mb-8">
        <span className="mr-2">Monthly</span>
        <Switch
          checked={isYearly}
          onCheckedChange={setIsYearly}
          aria-label="Toggle yearly pricing"
        />
        <span className="ml-2">Yearly</span>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`flex flex-col ${
              plan.name === "Premium"
                ? "relative bg-purple-900/10 border-purple-500"
                : ""
            }`}
          >
            {plan.name === "Premium" && (
              <div className="absolute inset-0 bg-purple-600 opacity-10 blur-xl -z-10 rounded-xl"></div>
            )}
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="grow">
              <div className="mb-4 text-4xl font-bold">
                ${isYearly ? plan.price.yearly : plan.price.monthly}
                <span className="text-sm font-normal">
                  /{isYearly ? "year" : "month"}
                </span>
              </div>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    {feature}
                  </li>
                ))}
                {plan.notIncluded.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-muted-foreground"
                  >
                    <X className="w-5 h-5 mr-2 text-red-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                variant={plan.name === "Hobbyist" ? "outline" : "default"}
                asChild
              >
                <Link href="/login">Choose Plan</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
