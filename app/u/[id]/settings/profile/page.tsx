import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import { SetupProfile } from "@/components/onboard/setup-profile";
import { DeleteAccount } from "@/components/settings/delete-account";

export const metadata: Metadata = {
  title: "Profile",
};

export default async function Page() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const { id, name, image } = session.user;

  return (
    <div className="space-y-6">
      <SetupProfile userId={id} name={name} imageUrl={image} />
      <DeleteAccount userId={id} />
    </div>
  );
}
