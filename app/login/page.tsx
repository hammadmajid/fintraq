import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { signIn } from "@/lib/auth";
import { SiGithub, SiGoogle } from "react-icons/si";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default async function Login() {
  return (
    <>
      <Header />
      <main className="min-h-screen grid place-content-center">
        <div className="mx-auto grid w-[350px] gap-8">
          <div>
            <h1 className="text-3xl font-bold">Hello, stranger!</h1>
            <p className="text-balance text-muted-foreground">
              Choose a preferred method to login.
            </p>
          </div>
          <div className="space-y-2">
            <form
              action={async (formData) => {
                "use server";
                try {
                  await signIn("resend", formData);
                  redirect("/login/sent");
                } catch (error) {
                  // TODO: handle this error properly
                  // create a toast showing the error msg
                  console.error(error);
                }
              }}
              className="space-y-2"
            >
              <Input type="text" name="email" placeholder="Email" required />
              <Button className="w-full" type="submit">
                <Mail className="w-4 h-4" /> Magic Link
              </Button>
            </form>
            <div className="py-2">
              <Separator />
            </div>
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
            >
              <Button variant="outline" className="w-full">
                <SiGithub className="w-4 h-4" /> GitHub
              </Button>
            </form>
            <Button variant="outline" className="w-full" disabled>
              <SiGoogle className="w-4 h-4" /> Google
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
