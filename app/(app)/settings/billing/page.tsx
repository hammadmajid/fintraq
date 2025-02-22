import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import { getPlan } from "@/actions/payments";
import { Plans } from "@/components/payments/plans";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const { id, name, email } = session.user;
  const plan = await getPlan(id);

  return (
    <main className="">
      <Card>
        <CardHeader>
          <CardTitle>Billing</CardTitle>
          <CardDescription>
            Manage your payments method and subsciption
          </CardDescription>
        </CardHeader>
        <CardContent>
          {plan === "Hobbyist" ? (
            <Plans
              userId={id}
              name={name || undefined}
              email={email as string}
            />
          ) : (
            <div>
              <p>
                You are subscribed to <strong>{plan}</strong>
              </p>
              <Button variant="destructive">Cancel</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  );
}
