"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { testimonials } from "@/data/testimonials";

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((c) => (c + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [next]);

  const slideVariants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  };

  const item = testimonials[current];

  return (
    <section id="testimonials" className="section-padding bg-white overflow-hidden">
      <div className="container-luxury">
        <SectionHeading
          label="Stimmen unserer Gäste"
          title="Was unsere Kundinnen sagen"
          description="Ehrliche Worte von Menschen, die uns ihr Vertrauen schenken."
        />

        <div className="relative mx-auto max-w-3xl">
          <Quote className="absolute -left-2 -top-4 h-12 w-12 text-soft-pink/60 md:-left-8" strokeWidth={1} />

          <div className="relative min-h-[280px] px-4 md:px-12">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={item.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <StarRating rating={item.rating} className="justify-center" />
                <p className="mt-6 font-serif text-2xl font-light leading-relaxed text-black md:text-3xl">
                  &ldquo;{item.text}&rdquo;
                </p>
                <footer className="mt-8">
                  <cite className="not-italic">
                    <span className="font-medium text-black">{item.name}</span>
                    {item.service && (
                      <span className="mt-1 block text-sm text-warm-gray">
                        {item.service}
                      </span>
                    )}
                  </cite>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={prev}
              aria-label="Vorheriger Testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === current ? "w-8 bg-black" : "w-2 bg-warm-gray-light"
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={next}
              aria-label="Nächster Testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
