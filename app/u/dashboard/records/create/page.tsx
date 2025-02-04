import { Metadata } from "next/types";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { CreateRecord } from "@/components/records/create-record";
import { getAllAccounts } from "@/actions/account";

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
    <main className="py-12">
      <CreateRecord accounts={accounts} />
    </main>
  );
}
