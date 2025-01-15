import { subscriptionPlans } from "@/lib/utils";

type PlanDetails = {
  name: (typeof subscriptionPlans)[number];
  description: string;
  price: { monthly: number; yearly: number };
  features: string[];
};

export const plansData: PlanDetails[] = [
  {
    name: "Pro Montly",
    description: "Ideal for freelancers and small businesses",
    price: { monthly: 4, yearly: 40 },
    features: [
      "Everything in Hobbyist",
      "Multiple accounts",
      "Advanced analytics",
      "Customizable categories",
    ],
  },
  {
    name: "Pro Yearly",
    description: "Ideal for freelancers and small businesses (yearly)",
    price: { monthly: 4, yearly: 40 },
    features: [
      "Everything in Hobbyist",
      "Multiple accounts",
      "Advanced analytics",
      "Customizable categories",
    ],
  },
  {
    name: "Premium Monthly",
    description: "Best for growing businesses",
    price: { monthly: 10, yearly: 100 },
    features: [
      "Everything in Pro",
      "Priority support",
      "Team collaboration",
      "API access",
      "White-label reports",
    ],
  },
  {
    name: "Premium Yearly",
    description: "Best for growing businesses (yearly)",
    price: { monthly: 10, yearly: 100 },
    features: [
      "Everything in Pro",
      "Priority support",
      "Team collaboration",
      "API access",
      "White-label reports",
    ],
  },
];
