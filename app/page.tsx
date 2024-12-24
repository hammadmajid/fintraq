import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { SiGithub } from "react-icons/si";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { PricingSection } from "@/components/landing/pricing-section";
import { TechStack } from "@/components/landing/tech-stack";
import { FeaturesSection } from "@/components/landing/features-section";

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 lg:w-3/4 py-12">
        <div className="flex flex-col md:flex-row items-center justify-center gap-16 md:gap-0 min-h-screen">
          <div className="w-full flex flex-col gap-8 items-start justify-start">
            <header className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 opacity-30 blur-3xl -z-10 rounded-full"></div>
              <div className="relative z-10 p-6">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Fintraq
                </h1>
                <p className="text-xl text-muted-foreground">
                  A simple finance tracker built with NextJs
                </p>
              </div>
            </header>
            <div className="flex gap-2 items-center justify-center">
              <Button asChild>
                <Link href="/login">
                  Get started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a
                  href="https://github.com/hammadmajid/fintraq"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGithub className="mr-2 h-4 w-4" />
                  Source code
                </a>
              </Button>
            </div>
          </div>
          <TechStack />
        </div>
        <FeaturesSection />
        <PricingSection />
      </main>
      <Footer />
    </>
  );
}
