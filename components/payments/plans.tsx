"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { Check } from "lucide-react";
import { useState } from "react";
import { Checkout } from "./checkout";
import { subscriptionPlans } from "@/lib/utils";
import { plansData } from "./plan-data";

// Make sure to call loadStripe outside of a component's render to avoid
// recreating the Stripe object on every render
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

interface PlansProps {
  userId: string;
  name?: string;
  email: string;
}

export function Plans({ userId, name, email }: PlansProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<
    (typeof subscriptionPlans)[number] | null
  >(null);

  const filteredPlans = plansData.filter((plan) =>
    isYearly ? plan.name.includes("Yearly") : plan.name.includes("Monthly"),
  );

  return (
    <div>
      {!selectedPlan ? (
        <>
          <div className="flex items-center justify-center mb-8">
            <span className="mr-2">Monthly</span>
            <Switch
              checked={isYearly}
              onCheckedChange={setIsYearly}
              aria-label="Toggle yearly pricing"
            />
            <span className="ml-2">Yearly</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredPlans.map((plan) => (
              <Card key={plan.name} className="flex flex-col">
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
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    onClick={() => setSelectedPlan(plan.name)}
                  >
                    Choose Plan
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </>
      ) : (
        <Elements stripe={stripePromise}>
          <Checkout
            userId={userId}
            plan={selectedPlan}
            name={name}
            email={email}
          />
          <div className="w-full mt-2">
            <Button
              className="w-full"
              variant="outline"
              onClick={() => setSelectedPlan(null)}
            >
              Cancel
            </Button>
          </div>
        </Elements>
      )}
    </div>
  );
}
