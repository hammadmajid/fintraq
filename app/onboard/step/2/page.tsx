import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Onboard",
  description: "Onboard your account",
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function OnboardStep2() {
  // TODO: check if user aleady has default account

  return (
    <Card className="w-[400px]">
      <CardHeader>
        <CardTitle>Default account</CardTitle>
        <CardDescription>
          Choose initial balance for your default cash account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Link href={"/onboard/step/3"}>
          <Button>Next</Button>
        </Link>
      </CardContent>
      <CardFooter>
        <Progress value={66} />
      </CardFooter>
    </Card>
  );
}
