import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for Fintraq, a modern finance tracking app",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-4xl font-bold">Terms of Service</h1>
        <p className="mb-4">
          By using Fintraq, you agree to the following terms:
        </p>
        <ul className="mb-4 list-disc list-inside space-y-2">
          <li>Fintraq is an open-source finance tracking application.</li>
          <li>
            You are responsible for maintaining the confidentiality of your
            account and password.
          </li>
          <li>
            You agree to use the service for personal, non-commercial purposes
            only.
          </li>
          <li>
            You will not use the service for any illegal or unauthorized
            purpose.
          </li>
          <li>
            We reserve the right to modify or terminate the service for any
            reason, without notice at any time.
          </li>
        </ul>
        <p>
          For any questions regarding our Terms of Service, please contact us.
        </p>
      </main>
      <Footer />
    </>
  );
}
