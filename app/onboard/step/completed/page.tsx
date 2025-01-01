import { setOnboardCompleted } from "@/actions/onboard";
import { Button } from "@/components/ui/button";
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
import { ArrowRight } from "lucide-react";
import Form from "next/form";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Onboard",
  description: "Onboard your account",
};

export default async function OnboardStep3() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  async function handleSubmit() {
    await setOnboardCompleted(userId);
    redirect("/u/0/dashboard");
  }

  return (
    <main className="grid w-3/4 min-h-screen mx-auto space-y-12 place-content-center">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>All done</CardTitle>
          <CardDescription>You are ready to use the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form action={handleSubmit}>
            <Button type="submit">
              Continue
              <ArrowRight />
            </Button>
          </Form>
        </CardContent>
        <CardFooter>
          <Progress value={100} />
        </CardFooter>
      </Card>
    </main>
  );
}
