import { Metadata } from "next/types";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateRecord } from "@/components/records/create-record";
import { getAllAccounts } from "@/actions/account";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Link } from "next-view-transitions";

export const metadata: Metadata = {
  title: "Create record",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const accounts = await getAllAccounts(userId);

  return (
    <main className="">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Create</h1>
          <p className="mb-6 text-muted-foreground">
            Add new transaction record.
          </p>
        </div>
        <Button size="lg" variant="secondary" asChild>
          <Link href="/u/dashboard/records">
            <X />
            Cancel
          </Link>
        </Button>
      </div>
      <CreateRecord accounts={accounts} />
    </main>
  );
}
