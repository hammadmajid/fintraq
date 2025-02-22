import { getRecords } from "@/actions/records";
import { ExpensesPieChart } from "@/components/dashboard/expenses-pie-chart";
import { IncomeExpenseBarChart } from "@/components/dashboard/income-expense-bar-chart";
import { FormatCurrency } from "@/components/format-currency";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { calculateTotalBalance } from "@/lib/utils";
import { FileText, Plus } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const records = await getRecords(userId);
  const totalBalance = calculateTotalBalance(records);

  return (
    <main>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-muted-foreground">Balance</p>
          <h1 className="text-2xl font-bold">
            <FormatCurrency userId={userId} amount={totalBalance} />
          </h1>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <FileText className="w-5" />
            Create report
          </Button>
          <Button asChild>
            <Link href="/records/create">
              <Plus />
              New record
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <IncomeExpenseBarChart records={records} />
        <ExpensesPieChart records={records} />
      </div>
    </main>
  );
}
