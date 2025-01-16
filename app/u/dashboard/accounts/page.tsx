import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { Landmark, Plus } from "lucide-react";
import { Link } from "next-view-transitions";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";
import { Suspense } from "react";
import { AccountsList } from "@/components/account/accounts-list";
import { Skeleton } from "@/components/ui/skeleton";

export const metadata: Metadata = {
  title: "Accounts",
};

export default async function AccountsPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  return (
    <main>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex gap-2 items-center">
            <Landmark />
            Accounts
          </h1>
          <p className="mb-6 text-muted-foreground">
            Create or manage your accounts
          </p>
        </div>
        <Button size="lg" asChild>
          <Link href="/u/dashboard/accounts/create">
            <Plus />
            Create
          </Link>
        </Button>
      </div>

      <Suspense
        fallback={
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[200px] w-full" />
            ))}
          </div>
        }
      >
        <AccountsList userId={session.user.id} />
      </Suspense>
    </main>
  );
}
