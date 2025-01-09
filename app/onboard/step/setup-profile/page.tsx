import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@radix-ui/react-progress";
import { Metadata } from "next";
import { SetupProfile } from "@/components/onboard/setup-profile";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Setup Profile",
  description: "Set your username and profile picture",
};

export default async function Page() {
  const session = await auth();

  if (!session?.user || !session?.user.id) {
    redirect("/login");
  }

  const { id, name, image } = session.user;

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Setup profile</CardTitle>
        <CardDescription>Tell us a little about yourself</CardDescription>
      </CardHeader>
      <CardContent>
        <SetupProfile
          userId={id}
          name={name}
          imageUrl={image}
          redirect={true}
        />
      </CardContent>
      <CardFooter>
        <Progress value={25} />
      </CardFooter>
    </Card>
  );
}
