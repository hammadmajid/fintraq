import { ExpensesPieChart } from "@/components/dashboard/expenses-pie-chart";
import { IncomeExpenseBarChart } from "@/components/dashboard/income-expense-bar-chart";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default function Dashboard() {
  return (
    <main>
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-muted-foreground">Balance</p>
          <h1 className="text-2xl font-bold">$ 1234.56</h1>
        </div>
        <div className="space-x-2">
          <Button variant="outline">
            <FileText className="w-5" /> Create Report
          </Button>
          <Button>
            <Plus className="w-5"></Plus> New Record
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <IncomeExpenseBarChart />
        <ExpensesPieChart />
      </div>
    </main>
  );
}
