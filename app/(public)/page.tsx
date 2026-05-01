import { FAQ } from "@/features/landing/components/faq"
import { FeaturesSection } from "@/features/landing/components/features-section"
import { HeroSection } from "@/features/landing/components/hero-section"
import { PricingSection } from "@/features/landing/components/pricing-section"
import { StatsSection } from "@/features/landing/components/stats-section"
import { CTASection } from "@/features/landing/components/cta-section"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Fintraq - Financial Management for Freelancers & Self-Employed",
  description:
    "Manage invoices, track expenses, and prepare taxes with ease. Fintraq is built for freelancers and self-employed professionals who want to reclaim their time.",
  keywords:
    "freelancer accounting, invoice management, expense tracking, tax preparation, self-employed, financial management, solo entrepreneur",
  authors: [{ name: "Fintraq" }],
  openGraph: {
    title: "Fintraq - Financial Management for Freelancers & Self-Employed",
    description:
      "Manage invoices, track expenses, and prepare taxes with ease. Fintraq is built for freelancers and self-employed professionals.",
    type: "website",
    url: "https://fintraq.tech",
    siteName: "Fintraq",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fintraq - Financial Management for Freelancers & Self-Employed",
    description:
      "Manage invoices, track expenses, and prepare taxes with ease. Fintraq is built for freelancers and self-employed professionals.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function Page() {
  return (
    <>
      <main className="w-full">
        <HeroSection />

        <section id="stats" className="bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <StatsSection />
          </div>
        </section>

        <section id="features" className="bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FeaturesSection />
          </div>
        </section>

        <section id="pricing" className="bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <PricingSection />
          </div>
        </section>

        <section id="faqs" className="bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <FAQ />
          </div>
        </section>

        <section className="bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <CTASection />
          </div>
        </section>
      </main>
    </>
  )
}
