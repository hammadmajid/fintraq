import { hasCurrencyPreference as hasPreference } from "@/actions/onboard";
import { CurrencySelector } from "@/components/onboard/currency-selector";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Onboard",
  description: "Onboard your account",
};

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
        <Progress value={50} />
      </CardFooter>
    </Card>
  );
}
