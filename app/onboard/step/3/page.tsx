import { Button } from "@/components/ui/button";
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
import { Link } from "next-view-transitions";
import { Metadata } from "next/types";

export const metadata: Metadata = {
  title: "Onboard",
  description: "Onboard your account",
};

export default function OnboardStep3() {
  return (
    <main className="grid w-3/4 min-h-screen mx-auto space-y-12 place-content-center">
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
