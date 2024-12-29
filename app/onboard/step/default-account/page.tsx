import { hasFirstRecord } from "@/actions/onboard";
import SetInitialBalance from "@/components/onboard/set-initial-balance";
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

export default async function OnboardStep2() {
  const session = await auth();

  if (!session?.user || !session?.user?.id) {
    redirect("/login");
  }

  if (await hasFirstRecord(session.user.id)) {
    redirect("/u/0/dashboard");
  }

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Default account</CardTitle>
        <CardDescription>
          Choose initial balance for your default cash account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SetInitialBalance userId={session.user.id} />
      </CardContent>
      <CardFooter>
        <Progress value={66} />
      </CardFooter>
    </Card>
  );
}
