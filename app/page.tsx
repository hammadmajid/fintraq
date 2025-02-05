import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { FAQ } from "@/components/landing/faq";
import { FeaturesSection } from "@/components/landing/features-section";
import { PricingSection } from "@/components/landing/pricing-section";
import { TechStack } from "@/components/landing/tech-stack";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "react-icons/si";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container px-4 py-12 mx-auto sm:px-6 lg:px-8 lg:w-3/4">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle className="font-semibold">Head up!</AlertTitle>
          <AlertDescription>
            This app is in active development. Expect bugs and data loss.
          </AlertDescription>
        </Alert>
        <div className="flex flex-col items-center justify-center min-h-screen gap-16 md:flex-row md:gap-0">
          <div className="flex flex-col items-start justify-start w-full gap-8">
            <header className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-purple-400 opacity-30 blur-3xl -z-10"></div>
              <div className="relative z-10 p-6">
                <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 lg:text-5xl">
                  Fintraq
                </h1>
                <p className="text-xl text-muted-foreground">
                  A simple finance tracker built with NextJs
                </p>
              </div>
            </header>
            <div className="flex items-center justify-center gap-2">
              <Button asChild>
                <Link href="/login">
                  Get started
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/hammadmajid/fintraq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGithub className="w-4 h-4" />
                  GitHub
                </a>
              </Button>
            </div>
          </div>
          <TechStack />
        </div>
        <FeaturesSection />
        <PricingSection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
