import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check Your Inbox",
  description: "Please check your inbox for the magic link.",
};

export default function Sent() {
  return (
    <main className="grid min-h-screen place-content-center">
      <div className="mx-auto grid w-[350px] gap-8">
        <div>
          <h1 className="text-3xl font-bold">Check Your Inbox</h1>
          <p className="text-muted-foreground">
            We have sent a magic link to your email. Please check your inbox to
            continue.
          </p>
        </div>
      </div>
    </main>
  );
}
