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
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { subscriptionPlans } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface CheckoutProps {
  userId: string;
  name?: string;
  email: string;
  plan: (typeof subscriptionPlans)[number];
}

export function Checkout({ userId, name, email, plan }: CheckoutProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return (
        <div className="p-4">
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </div>
      );
    }

    setProcessing(true);

    const cardElement = elements.getElement(CardElement);

    if (cardElement) {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

      if (error) {
        setError(error.message ?? "An unknown error occurred");
        setProcessing(false);
      } else {
        const response = await fetch("/api/stripe/checkout_session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId,
            name,
            email,
            paymentMethodId: paymentMethod.id,
            plan,
          }),
        });

        const session = await response.json();

        if (session.error) {
          setError(session.error);
          setProcessing(false);
        } else {
          // Handle successful payment (e.g., show a success message, update user's subscription status)
          console.log("Payment successful:", session);
          setProcessing(false);
        }
      }
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete your purchase</CardTitle>
        <CardDescription>
          You&apos;re subscribing to the {plan} plan
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="mb-4">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#424770",
                    "::placeholder": {
                      color: "#aab7c4",
                    },
                  },
                  invalid: {
                    color: "#9e2146",
                  },
                },
              }}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            disabled={!stripe || processing}
            className="w-full"
          >
            {processing ? "Processing..." : "Pay now"}
          </Button>
        </CardFooter>
      </form>
      {error && <div className="text-red-500 mt-4 text-center">{error}</div>}
    </Card>
  );
}
