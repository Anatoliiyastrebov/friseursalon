"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

interface CtaBannerProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CtaBanner({
  title,
  description,
  buttonText = "Termin buchen",
  buttonHref = "#booking",
}: CtaBannerProps) {
  return (
    <section className="section-padding !py-12">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="container-luxury"
      >
        <div className="relative overflow-hidden rounded-3xl luxury-gradient px-8 py-14 text-center md:px-16 md:py-20">
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/30 blur-3xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-soft-pink-accent/20 blur-3xl"
            animate={{ scale: [1.1, 1, 1.1] }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          <h3 className="relative font-serif text-3xl font-light text-black md:text-4xl">
            {title}
          </h3>
          <p className="relative mx-auto mt-4 max-w-lg text-warm-gray">
            {description}
          </p>
          <div className="relative mt-8">
            <Button href={buttonHref}>{buttonText}</Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
