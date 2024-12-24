import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LoginForm } from "@/components/auth/login";
import { signIn } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function Login() {
  async function handleSubmit(formData: FormData) {
    "use server";
    try {
      await signIn("resend", formData);
      return { success: true };
    } catch (error) {
      console.error(error);
      return {
        success: false,
        error: "Failed to send magic link. Please try again.",
      };
    }
  }

  async function handleGithubLogin() {
    "use server";
    await signIn("github");
  }

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
          <LoginForm
            onSubmit={handleSubmit}
            onGithubLogin={handleGithubLogin}
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
