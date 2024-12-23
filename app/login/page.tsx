import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Github, KeyRound } from "lucide-react";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { hasCurrencyPreference, hasFirstRecord } from "@/actions/onboard";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Login() {
  const session = await auth();

  if (session?.user) {
    if (!hasCurrencyPreference) {
      redirect("/onboard/step/1");
    }
    if (!hasFirstRecord) {
      redirect("/onboard/step/2");
    }
    redirect("/u/0/dashboard");
  }

  return (
    <main className="min-h-screen grid place-content-center">
      <div className="mx-auto grid w-[350px] gap-8">
        <div>
          <h1 className="text-3xl font-bold">Hello, stranger!</h1>
          <p className="text-balance text-muted-foreground">
            Choose a preferred method to login.
          </p>
        </div>
        <div className="space-y-2">
          <Button className="w-full" disabled>
            <KeyRound className="w-4 h-4" /> Passkey
          </Button>
          <form
            action={async () => {
              "use server";
              await signIn("github");
            }}
          >
            <Button variant="outline" className="w-full">
              <Github className="w-4 h-4" /> GitHub
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
