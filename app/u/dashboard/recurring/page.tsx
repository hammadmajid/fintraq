import { Button } from "@/components/ui/button";
import { Plus, SquareArrowOutUpRight, Wrench } from "lucide-react";
import { Metadata } from "next/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Recurring",
};

export default async function Page() {
  return (
    <main className="h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Recurring</h1>
          <p className="mb-6 text-muted-foreground">
            Create or manage your reccuring payments here.
          </p>
        </div>
        <Button size="lg">
          <Plus />
          New
        </Button>
      </div>
      <div>
        <Card>
          <CardHeader>
            <CardTitle className="flex gap-2 items-center">
              <Wrench />
              <span>Not implemented yet!</span>
            </CardTitle>
            <CardDescription>
              This feature hasn&apos;t been implemented yet. Check back leter.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button variant="secondary">
              <a
                href="https://github.com/hammadmajid/fintraq/issues"
                className="flex gap-2 items-center"
                target="_blank"
              >
                Track status on GitHub
                <SquareArrowOutUpRight />
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
