import { getAllAccounts } from "@/actions/account";
import { CreateBudget } from "@/components/budgets/create-budget";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { X } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Create budget",
};

export default async function AccountsPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const accounts = await getAllAccounts(session.user.id);

  return (
    <main className="pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create</h1>
          <p className="mb-6 text-muted-foreground">Add new budget.</p>
        </div>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/u/dashboard/budgets">
            <X />
            Cancel
          </Link>
        </Button>
      </div>
      <CreateBudget accounts={accounts} />
    </main>
  );
}
