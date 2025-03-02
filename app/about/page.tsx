import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Fintraq, a modern finance tracking app.",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-4xl font-bold">About Fintraq</h1>
        <p className="mb-4">
          Fintraq is a modern finance tracking app built with Next.js, Vercel
          Postgres, and shadcn/ui.
        </p>
        <h2 className="mb-2 text-2xl font-semibold">Features</h2>
        <ul className="mb-4 list-disc list-inside">
          <li>User Authentication: Secure sign-up and login functionality.</li>
          <li>
            Multiple Accounts: Track your expenses across multiple accounts.
          </li>
          <li>Track Expenses: Easily log and categorize your expenses.</li>
          <li>Manage Budgets: Control your spending with budgets.</li>
          <li>Responsive Design: Optimized for both desktop and mobile use.</li>
        </ul>
        <p>
          Fintraq is an open-source project. Contributions are welcome! Check
          out our GitHub repository for more information.
        </p>
      </main>
      <Footer />
    </>
  );
}
