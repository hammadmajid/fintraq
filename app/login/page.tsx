import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { LoginForm } from "@/components/auth/login";
import { signIn } from "@/lib/auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your Fintraq account",
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative flex items-center justify-center flex-grow px-4 overflow-hidden sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-600 opacity-30 blur-3xl -z-10"></div>
        <div className="relative z-10 w-full max-w-md">
          <LoginForm
            onSubmit={handleSubmit}
            onGithubLogin={handleGithubLogin}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
