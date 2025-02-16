import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Landmark } from "lucide-react";

export default function Loading() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex gap-2 items-center">
            <Landmark />
            Budgets
          </h1>
          <p className="mb-6 text-muted-foreground">
            Create or manage your budgets
          </p>
        </div>
        <Button size="lg" disabled>
          New
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-[200px] w-full" />
        ))}
      </div>
    </main>
  );
}
