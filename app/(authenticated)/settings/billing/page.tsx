import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Billing",
};

export default function BillingSettings() {
  return (
    <main className="w-3/4 mx-auto">
      <Card>
        <CardContent className="p-6">
          <p>Coming soon... </p>
        </CardContent>
      </Card>
    </main>
  );
}
