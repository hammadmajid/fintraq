import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import { subscriptionPlans } from "@/lib/utils";
import { db } from "@/drizzle/db/client";
import { preferences } from "@/drizzle/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-01-27.acacia",
});

const data = z.object({
  userId: z.string(),
  email: z.string().email(),
  name: z.string().optional(),
  paymentMethodId: z.string(),
  plan: z.enum(subscriptionPlans),
});

const priceIDs: Record<string, string> = {
  Hobbyist: process.env.STRIPE_PRICE_HOBBYIST!,
  "Pro Monthly": process.env.STRIPE_PRICE_PRO_MONTHLY!,
  "Pro Yearly": process.env.STRIPE_PRICE_PRO_YEARLY!,
  "Premium Monthly": process.env.STRIPE_PRICE_PREMIUM_MONTHLY!,
  "Premium Yearly": process.env.STRIPE_PRICE_PREMIUM_YEARLY!,
};

export async function POST(req: NextRequest) {
  const { userId, email, name, paymentMethodId, plan } = data.parse(
    await req.json(),
  );

  const priceId = priceIDs[plan];

  try {
    const customer = await stripe.customers.create({
      name,
      email,
      payment_method: paymentMethodId,
      invoice_settings: {
        default_payment_method: paymentMethodId,
      },
    });

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: priceId }],
      payment_behavior: "default_incomplete",
      expand: ["latest_invoice.payment_intent"],
    });

    const invoice = subscription.latest_invoice as Stripe.Invoice;
    const payment_intent = invoice.payment_intent as Stripe.PaymentIntent;

    await db
      .update(preferences)
      .set({ plan })
      .where(eq(preferences.userId, userId));

    return NextResponse.json({
      subscriptionId: subscription.id,
      clientSecret: payment_intent.client_secret,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "An error occurred while processing your payment." },
      { status: 500 },
    );
  }
}
