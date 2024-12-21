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
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "next-view-transitions";

export default function OnboardStep3() {
  return (
    <main className="w-3/4 space-y-12 mx-auto min-h-screen grid place-content-center">
      {/* <h1 className="font-extrabold text-3xl">Let's get you set up</h1> */}
      <div></div>
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>All done</CardTitle>
          <CardDescription>You are ready to use the app.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/u/0/dashboard">
            <Button>
              Continue
              <ArrowRight />
            </Button>
          </Link>
        </CardContent>
        <CardFooter>
          <Progress value={100} />
        </CardFooter>
      </Card>
    </main>
  );
}
