import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Loans",
};

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Loans</h1>
          <p className="mb-6 text-muted-foreground">
            Create or manage your loans
          </p>
        </div>
        <Button size="lg">
          <Plus />
          Loan
        </Button>
      </div>
    </main>
  );
}
