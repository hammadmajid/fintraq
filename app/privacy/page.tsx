import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Fintraq, a modern finance tracking app",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="container px-4 py-8 mx-auto">
        <h1 className="mb-4 text-4xl font-bold">Privacy Policy</h1>
        <p className="mb-4">
          At Fintraq, we are committed to protecting your privacy:
        </p>
        <ul className="mb-4 list-disc list-inside space-y-2">
          <li>
            Data Collection: We collect information you provide directly to us,
            such as when you create an account or use our services.
          </li>
          <li>
            Use of Data: We use the collected data to provide our services.
          </li>
          <li>
            Data Security: We implement reasonable security measures to protect
            your personal information.
          </li>
          <li>
            Third-Party Sharing: We do not sell your personal data to third
            parties.
          </li>
          <li>
            Open Source: Fintraq is an open-source application. You can review
            our code on our GitHub repository.
          </li>
          <li>
            Changes to Privacy Policy: We may update this privacy policy from
            time to time. We will notify you of any changes by posting the new
            policy on this page.
          </li>
        </ul>
        <p>
          By using Fintraq, you agree to the terms of this privacy policy. For
          any questions, please contact us.
        </p>
      </main>
      <Footer />
    </>
  );
}
