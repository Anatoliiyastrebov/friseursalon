"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqItems } from "@/data/faq";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="section-padding bg-beige/30">
      <div className="container-luxury">
        <SectionHeading
          label="FAQ"
          title="Häufige Fragen"
          description="Alles, was Sie vor Ihrem Besuch wissen möchten."
        />

        <div className="mx-auto max-w-3xl space-y-3">
          {faqItems.map((item) => {
            const isOpen = openId === item.id;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="overflow-hidden rounded-2xl border border-beige-dark/50 bg-white/60"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-black">{item.question}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-warm-gray" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-warm-gray" />
                  )}
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="border-t border-beige-dark/40 px-6 pb-5 pt-2 text-sm leading-relaxed text-warm-gray">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
