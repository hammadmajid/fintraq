import { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Fintraq, a modern finance tracking app",
};

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">About Fintraq</h1>
        <p className="mb-4">
          Fintraq is a modern finance tracking app built with Next.js, Vercel
          Postgres, and shadcn/ui.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Features</h2>
        <ul className="list-disc list-inside mb-4">
          <li>User Authentication: Secure sign-up and login functionality.</li>
          <li>
            Multiple Accounts: Track your expenses across multiple accounts.
          </li>
          <li>Track Expenses: Easily log and categorize your expenses.</li>
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
