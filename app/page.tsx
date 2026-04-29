import { Footer } from "@/features/landing/components/footer"
import { Header } from "@/features/landing/components/header"
import { FAQ } from "@/features/landing/components/faq"
import { FeaturesSection } from "@/features/landing/components/features-section"
import { HeroSection } from "@/features/landing/components/hero-section"
import { PricingSection } from "@/features/landing/components/pricing-section"
import { StatsSection } from "@/features/landing/components/stats-section"
import { CTASection } from "@/features/landing/components/cta-section"

export default function Page() {
  return (
    <>
      <Header />
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
      <Footer />
    </>
  )
}
