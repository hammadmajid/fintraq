import { Metadata } from "next/types";
import { CurrencySelector } from "./currency-selector";

export const metadata: Metadata = {
  title: "Onboard",
  description: "Onboard your account",
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { hasCurrencyPreference as hasPreference } from "./action";

export default async function OnboardStep1() {
  const session = await auth();

  if (!session?.user || !session?.user.id) {
    redirect("/login");
  }
  const userId = session.user.id;

  if (await hasPreference(userId)) {
    redirect("/u/0/dashboard");
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Default currency</CardTitle>
        <CardDescription>
          This is the currency that will be used in the dashboard.{" "}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CurrencySelector userId={userId} />
      </CardContent>
      <CardFooter>
        <Progress value={33} />
      </CardFooter>
    </Card>
  );
}
