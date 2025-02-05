import { CreateAccount } from "@/components/account/create-account";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { X } from "lucide-react";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Create account",
};

export default async function AccountsPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  return (
    <main className="pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create</h1>
          <p className="mb-6 text-muted-foreground">
            Add new transaction record.
          </p>
        </div>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/u/dashboard/accounts">
            <X />
            Cancel
          </Link>
        </Button>
      </div>
      <CreateAccount userId={session.user.id} />
    </main>
  );
}
