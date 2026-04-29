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
      "Simply sign up with your email and start using Fintraq immediately. No credit card required. After 14 days, you can upgrade to a paid plan or continue exploring the free tier features.",
  },
  {
    question: "Is my financial data secure?",
    answer:
      "Yes, we take security seriously. All data is encrypted in transit and at rest using industry-standard protocols. We comply with GDPR, SOC 2, and other compliance standards. Your data is never shared with third parties.",
  },
  {
    question: "Can I import my existing data?",
    answer:
      "Absolutely! Fintraq supports importing data from CSV files, QuickBooks, and other accounting software. Our import wizard makes it easy to migrate your existing data in minutes.",
  },
  {
    question: "Does Fintraq integrate with my bank?",
    answer:
      "Professional and Enterprise plans include bank integration for real-time transaction syncing. We currently support most major US and international banks through secure API connections.",
  },
  {
    question: "Can multiple team members use the same account?",
    answer:
      "Yes! Professional plans include up to 3 team members, and Enterprise plans have unlimited users. You can assign different permission levels to control what each team member can access.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, ACH transfers, and wire transfers for annual subscriptions. Monthly billing is available for credit card payments.",
  },
]

export function FAQ() {
  return (
    <section id="faqs" className="w-full py-24">
      <div className="mb-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground">
          Have questions? We have answers. Can't find what you're looking for?{" "}
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
