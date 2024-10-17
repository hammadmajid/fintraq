import SignUpForm from "@/components/auth/signup-form";
import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default async function SignUp() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  return (
    <main className="flex flex-col gap-4 p-8 sm:p-20">
      <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
        Create Account
      </h1>
      <SignUpForm />
      <p>
        Already have an account?{" "}
        <Button variant="link" className="p-0" asChild>
          <Link href="/signin">Sign In</Link>
        </Button>
      </p>
    </main>
  );
}
