import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { getAllAccounts } from "@/actions/account";
import { DeleteBudget } from "@/components/budgets/delete-budget";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import { getBudgetById } from "@/actions/budgets";
import { EditBudget } from "@/components/budgets/edit-budget";

export const metadata: Metadata = {
  title: "Edit budget",
};

export default async function EditBudgetPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const resolvedSearchParams = await searchParams;

  const budgetId = resolvedSearchParams.id as string;
  const [budget] = await getBudgetById(budgetId);

  if (!budget) {
    return <div>Invalid id</div>;
  }

  const accounts = await getAllAccounts(session.user.id);

  return (
    <main className="pb-12">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budget</h1>
          <p className="mb-6 text-muted-foreground">Edit budget</p>
        </div>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/u/dashboard/budgets">
            <X />
            Cancel
          </Link>
        </Button>
      </div>
      <div className="grid gap-2">
        <EditBudget accounts={accounts} budget={budget} />
        <DeleteBudget id={budget.id} />
      </div>
    </main>
  );
}
