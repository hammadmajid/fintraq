import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Metadata } from "next";
import { Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "Billing",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  return (
    <main className="w-3/4 min-h-screen grid place-content-center mx-auto">
      <Card>
        <CardContent className="p-6">
          <p className="flex gap-2 items-center">
            <Wrench />
            <span>Coming soon</span>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
