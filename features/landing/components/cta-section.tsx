import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="w-full py-24">
      <div className="rounded-lg border border-primary/20 bg-gradient-to-r from-primary/5 via-primary/5 to-transparent px-6 py-12 text-center sm:px-8 sm:py-16 md:px-12">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">
          Ready to Take Control of Your Finances?
        </h2>
        <p className="mb-8 text-lg text-muted-foreground">
          Join thousands of freelancers and self-employed professionals already
          using Fintraq to manage their finances with confidence.
        </p>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/signup"
            className={
              buttonVariants({ size: "lg" }) +
              " flex items-center justify-center gap-2"
            }
          >
            Start Free Trial
            <ArrowRight data-icon="inline-end" />
          </Link>
          <Link
            href="/login"
            className={buttonVariants({ size: "lg", variant: "outline" })}
          >
            Already have an account?
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted-foreground">
          No credit card required • 14-day free trial • Cancel anytime
        </p>
      </div>
    </section>
  )
}
