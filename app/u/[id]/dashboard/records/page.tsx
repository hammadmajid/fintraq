import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Records",
};

export default async function Page() {
  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Records</h1>
          <p className="text-muted-foreground mb-6">
            Create or manage your transactional records
          </p>
        </div>
        <Button size="lg">
          <Plus />
          Record
        </Button>
      </div>
    </main>
  );
}
