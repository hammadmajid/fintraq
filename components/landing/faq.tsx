import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQ {
  question: string;
  answer: string;
}

const FAQs: FAQ[] = [
  {
    question: "Is this a real product?",
    answer:
      "No, this is a project created for learning purposes. It is not an actual product.",
  },
  {
    question: "Is the software functional?",
    answer:
      "This is a pre-alpha version of the software and it is still in development.",
  },
  {
    question: "Can I contribute to this project?",
    answer:
      "Yes, you can contribute to this project by submitting a pull request on GitHub.",
  },
  {
    question: "Can I use the code from this project in my own work?",
    answer:
      "Yes, you can use the code as a learning resource or as a base for your own projects.",
  },
];

export function FAQ() {
  return (
    <section id="faqs">
      <div className="text-center">
        <h2 className="text-3xl font-bold">FAQ</h2>
      </div>
      <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
        {FAQs.map(({ question, answer }, index) => (
          <AccordionItem key={index} value={String(index)}>
            <AccordionTrigger>{question}</AccordionTrigger>
            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
