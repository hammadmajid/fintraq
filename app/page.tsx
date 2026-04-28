import { Footer } from "@/features/landing/components/footer"
import { Header } from "@/features/landing/components/header"
import { FAQ } from "@/features/landing/components/faq"
import { FeaturesSection } from "@/features/landing/components/features-section"
import { TechStack } from "@/features/landing/components/tech-stack"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { SiGithub } from "react-icons/si"

export default function Page() {
  return (
    <>
      <Header />
      <main className="container mx-auto px-4 py-12 sm:px-6 lg:w-3/4 lg:px-8">
        <div className="flex min-h-96 flex-col items-center justify-center gap-16 md:flex-row md:gap-0">
          <div className="flex w-full flex-col items-start justify-start gap-8">
            <header className="relative">
              <div className="absolute inset-0 -z-10 rounded-full bg-[var(--gradient-primary)] opacity-30 blur-3xl"></div>
              <div className="relative z-10 p-6">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                  Fintraq
                </h1>
                <p className="text-xl text-muted-foreground">
                  Finance tracking for the 21st century.
                </p>
              </div>
            </header>
            <div className="flex items-center justify-center gap-2">
              <Button render={<Link href="/login" />}>
                Get started
                <ArrowRight data-icon="inline-end" />
              </Button>
              <Button
                variant="outline"
                render={
                  <a
                    href="https://github.com/hammadmajid/fintraq"
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                <SiGithub data-icon="inline-start" />
                GitHub
              </Button>
            </div>
          </div>
          <TechStack />
        </div>
        <div className="space-y-8">
          <FeaturesSection />
          <FAQ />
        </div>
      </main>
      <Footer />
    </>
  )
}
