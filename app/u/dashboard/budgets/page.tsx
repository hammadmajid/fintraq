import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next/types";
import { getAllBudgets } from "@/actions/budgets";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { BudgetCard } from "@/components/budgets/budget-card";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Budgets",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const budgets = await getAllBudgets(userId);

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budgets</h1>
          <p className="mb-6 text-muted-foreground">
            Create or manage your budgets
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/u/dashboard/budgets/create">
            <Plus />
            New
          </Link>
        </Button>
      </div>
      <div>
        {budgets.length === 0 ? (
          <p>No budgets</p>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {budgets.map((budget) => {
              return <BudgetCard key={budget.id} budget={budget} />;
            })}
          </div>
        )}
      </div>
    </main>
  );
}
