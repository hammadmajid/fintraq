import { getAccountById } from "@/actions/account";
import { DeleteBankAccount } from "@/components/account/delete-account";
import { DynamicIcon } from "@/components/dynamic-icon";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { AlertCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Delete account",
};

export default async function DeleteAccountPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const { id } = await params;

  const [account] = await getAccountById(id);

  return (
    <main className="grid place-content-center h-full">
      <Card className="md:max-w-[450px]">
        <CardHeader>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Head up!</AlertTitle>
            <AlertDescription>
              This action is irreversible! Procced with caution.
            </AlertDescription>
          </Alert>
        </CardHeader>
        <CardContent>
          <p>
            You are about to delete{" "}
            <span className="space-x-2 font-semibold">
              <DynamicIcon name={account.icon} className="inline" />{" "}
              {account.title}
            </span>{" "}
            and all its records, budgets and loans.
          </p>
        </CardContent>
        <DeleteBankAccount id={account.id} />
      </Card>
    </main>
  );
}
