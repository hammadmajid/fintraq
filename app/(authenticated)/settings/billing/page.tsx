"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { CreditCard, Check } from "lucide-react";

export default function BillingSettings() {
  const [currentPlan, setCurrentPlan] = useState("free");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const plans = [
    {
      name: "Free",
      price: { monthly: 0, yearly: 0 },
      features: ["Basic features", "Limited storage"],
    },
    {
      name: "Pro",
      price: { monthly: 9.99, yearly: 99.99 },
      features: ["Advanced features", "Unlimited storage", "Priority support"],
    },
    {
      name: "Team",
      price: { monthly: 49.99, yearly: 499.99 },
      features: ["All Pro features", "Team collaboration", "Admin controls"],
    },
  ];

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Billing Settings</h1>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Subscription</CardTitle>
            <CardDescription>
              Manage your current subscription plan.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold mb-4">
              You are currently on the{" "}
              <span className="text-primary">
                {currentPlan.charAt(0).toUpperCase() + currentPlan.slice(1)}
              </span>{" "}
              plan.
            </p>
            {currentPlan !== "free" && (
              <Button variant="destructive">Cancel Subscription</Button>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Available Plans</CardTitle>
            <CardDescription>
              Choose the plan that works best for you.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-end mb-4">
              <div className="flex items-center space-x-2">
                <Label htmlFor="billing-cycle">Annual Billing</Label>
                <Switch
                  id="billing-cycle"
                  checked={billingCycle === "yearly"}
                  onCheckedChange={(checked) =>
                    setBillingCycle(checked ? "yearly" : "monthly")
                  }
                />
              </div>
            </div>
            <RadioGroup value={currentPlan} onValueChange={setCurrentPlan}>
              {plans.map((plan) => (
                <div
                  key={plan.name.toLowerCase()}
                  className="flex items-center space-x-2 mb-4"
                >
                  <RadioGroupItem
                    value={plan.name.toLowerCase()}
                    id={plan.name.toLowerCase()}
                  />
                  <Label
                    htmlFor={plan.name.toLowerCase()}
                    className="flex flex-col"
                  >
                    <span className="text-lg font-semibold">{plan.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ${plan.price[billingCycle].toFixed(2)} /{" "}
                      {billingCycle === "monthly" ? "month" : "year"}
                    </span>
                    <ul className="text-sm text-muted-foreground mt-2">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          <Check className="mr-2 h-4 w-4" /> {feature}
                        </li>
                      ))}
                    </ul>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </CardContent>
          <CardFooter>
            <Button disabled={currentPlan === "free"}>
              {currentPlan === "free" ? "Current Plan" : "Upgrade Plan"}
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
            <CardDescription>Manage your payment information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="1234 5678 9012 3456" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" placeholder="MM/YY" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <CreditCard className="mr-2 h-4 w-4" /> Update Payment Method
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
