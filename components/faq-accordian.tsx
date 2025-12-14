"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "motion/react";

export const faqData = [
  {
    question: "What is DotPortion?",
    answer:
      "DotPortion is a visual backend platform that lets you build APIs, workflows, schemas, analytics, and backend logic without writing boilerplate code. Everything happens in one unified canvas — fast, visual, and production-ready.",
  },
  {
    question: "When will beta start?",
    answer:
      "The private beta opens soon and will roll out in small batches. Early waitlist users will receive access first. Only a limited number of builders will be invited initially.",
  },
  {
    question: "Is DotPortion free during beta?",
    answer:
      "Yes. All beta users get full access during the testing period, along with exclusive perks like priority onboarding, feedback sessions, and locked-in discounts for future plans.",
  },
  {
    question: "Who is this for?",
    answer:
      "DotPortion is built for developers, founders, indie hackers, and teams who want to ship backend features quickly. Whether you're building an MVP, automating workflows, or scaling a production app, DotPortion removes the friction.",
  },
  {
    question: "Do I need backend experience?",
    answer:
      "Not at all. The workflow builder, visual schema tools, and auto-generated API docs make backend development accessible even if you’ve never built a server before. Developers can still go deep with custom logic when needed.",
  },
  {
    question: "What makes DotPortion different?",
    answer:
      "Most tools solve one part of backend development, APIs, DBs, workflows, or logs. DotPortion integrates everything into a single visual platform. You build faster, debug easier, and scale without juggling multiple services or writing repetitive boilerplate.",
  },
];

export default function FAQAccordion() {
  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-4 relative overflow-hidden rounded-2xl">
      <div className="relative z-10 flex flex-col">
        <Accordion type="single" collapsible defaultValue="item-0">
          {faqData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: idx * 0.12, ease: "easeOut" }}
              className="border-b border-neutral-300 dark:border-neutral-700"
            >
              <AccordionItem value={`item-${idx}`}>
                <AccordionTrigger className="w-full flex justify-between items-center py-5 text-left focus:outline-none transition-colors hover:no-underline [&>svg]:h-6 [&>svg]:w-6">
                  <span className="w-full pr-4 text-[16px] font-medium text-black dark:text-white">
                    {item.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="w-full max-w-2/3 pr-6">
                  <div className="pb-5 text-neutral-500 text-[15px] leading-relaxed">
                    {item.answer}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
