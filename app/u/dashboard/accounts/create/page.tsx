import { CreateAccount } from "@/components/account/create-account";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Create account",
};

export default async function AccountsPage() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  return (
    <main className="p-12">
      <CreateAccount userId={session.user.id} />
    </main>
  );
}
