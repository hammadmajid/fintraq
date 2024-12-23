import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "Budgets",
  };

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Budgets</h1>
          <p className="text-muted-foreground mb-6">
            Create or manage your budgets
          </p>
        </div>
        <Button size="lg">
          <Plus />
          Budget
        </Button>
      </div>
    </main>
  );
}
