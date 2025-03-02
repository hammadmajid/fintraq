import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SiGithub } from "react-icons/si";
import { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getCurrency } from "@/actions/preferences";
import { ChangeCurrency } from "@/components/settings/change-currency";
import { SetupProfile } from "@/components/onboard/setup-profile";
import { DeleteAccount } from "@/components/settings/delete-account";

export const metadata: Metadata = {
  title: "Settings",
};

export default async function Settings() {
  const session = await auth();

  if (!session || !session.user?.id) {
    redirect("/login");
  }

  const userId = session.user.id;

  const currency = await getCurrency(userId);

  return (
    <div className="flex flex-col justify-between h-full pb-8">
      <main className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your profile info.</CardDescription>
            </CardHeader>
            <CardContent>
              <SetupProfile
                userId={userId}
                imageUrl={session.user.image}
                name={session.user.name}
                redirect={false}
              />
            </CardContent>
          </Card>
          <ChangeCurrency userId={userId} currency={currency} />
        </div>
        <DeleteAccount userId={userId} />
      </main>
      <div className="text-center">
        <Button variant="link" asChild>
          <Link
            href="https://github.com/hammadmajid/fintraq"
            className="flex gap-2"
          >
            <SiGithub />
            <span>hammadmajid/fintraq</span>
          </Link>
        </Button>
      </div>
    </div>
  );
}
