import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

interface FAQ {
  question: string
  answer: string
}

const FAQs: FAQ[] = [
  {
    question: "How does the 14-day free trial work?",
    answer:
      "Simply sign up with your email and start using Fintraq immediately. No credit card required. After 14 days, you can upgrade to a paid plan or continue with the free tier.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, we take security seriously. All data is encrypted in transit and at rest using industry-standard protocols. We comply with GDPR and other compliance standards. Your data is never shared with third parties.",
  },
  {
    question: "Can I import my existing invoices and expenses?",
    answer:
      "Absolutely! Fintraq supports importing data from CSV files and other accounting software. Our import wizard makes it easy to migrate your existing data in minutes.",
  },
  {
    question: "Does Fintraq work with my bank?",
    answer:
      "Yes! Our Professional plan includes bank integration for real-time transaction syncing. We currently support most major US and international banks through secure API connections.",
  },
  {
    question: "Can I generate tax reports for deductions?",
    answer:
      "Yes! Fintraq automatically categorizes expenses and generates comprehensive tax reports organized by deductible categories. Perfect for filing taxes or working with a CPA.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards for monthly and annual subscriptions. Choose what works best for your cash flow.",
  },
]

export function FAQ() {
  return (
    <section id="faqs" className="w-full py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
         <p className="text-lg text-muted-foreground">
           Have questions? We have answers. Can&apos;t find what you&apos;re looking for?{" "}
          <a href="mailto:support@fintraq.com" className="font-medium text-primary hover:underline">
            Contact our support team
          </a>
          .
        </p>
      </div>
      <Accordion className="mx-auto w-full max-w-3xl">
        {FAQs.map(({ question, answer }, index) => (
          <AccordionItem key={index} value={String(index)}>
            <AccordionTrigger className="text-left text-base font-medium hover:text-primary">
              {question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
