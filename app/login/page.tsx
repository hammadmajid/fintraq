import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { auth, signIn } from "@/lib/auth";
import { Mail } from "lucide-react";
import { Metadata } from "next";
import Form from "next/form";
import { redirect } from "next/navigation";
import { SiGithub, SiGoogle } from "react-icons/si";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Fintraq account",
};

export default async function Login() {
  const session = await auth();

  if (session && session.user?.id) {
    redirect("/u/0/dashboard");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative flex items-center justify-center flex-grow px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-30 blur-3xl -z-10"></div>
        <div className="relative z-10 w-full max-w-md">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Hello, stranger!</CardTitle>
              <CardDescription>
                Choose your preferred login method
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Form
                action={async (formData: FormData) => {
                  "use server";
                  await signIn("resend", formData);
                }}
                className="space-y-4"
              >
                <Input
                  type="text"
                  name="email"
                  placeholder="Email"
                  required
                  className="w-full"
                />
                <Button className="w-full" type="submit">
                  <Mail className="w-4 h-4 mr-2" />
                  Send Magic Link
                </Button>
              </Form>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-background text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Form
                  action={async () => {
                    "use server";
                    await signIn("github");
                  }}
                >
                  <Button variant="outline" className="w-full" type="submit">
                    <SiGithub className="w-4 h-4 mr-2" /> GitHub
                  </Button>
                </Form>
                <Button variant="outline" className="w-full" disabled>
                  <SiGoogle className="w-4 h-4 mr-2" /> Google
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}
