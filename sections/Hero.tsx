"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1521590832167-7bcbfda6381f?w=1920&h=1080&fit=crop&q=85"
          alt="Mira Beauty Lounge Salon Interior"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
      </motion.div>

      <motion.div
        aria-hidden
        className="absolute right-[10%] top-[20%] z-10 hidden h-32 w-32 rounded-full border border-white/20 lg:block"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="absolute left-[8%] bottom-[25%] z-10 hidden h-20 w-20 rounded-full bg-soft-pink/30 blur-xl lg:block"
        animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        aria-hidden
        className="glass absolute right-[5%] bottom-[30%] z-10 hidden rounded-2xl px-6 py-4 lg:block"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <p className="text-xs uppercase tracking-widest text-warm-gray">
          Seit 2018
        </p>
        <p className="font-serif text-lg text-black">München</p>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="container-luxury relative z-20 px-5 pt-32 pb-20 text-center md:pt-40"
      >
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-block text-xs font-medium uppercase tracking-[0.35em] text-white/80"
        >
          {siteConfig.name}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-serif text-5xl font-light leading-[1.1] text-white md:text-7xl lg:text-8xl"
        >
          Your Beauty.
          <br />
          <span className="italic">Your Style.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mx-auto mt-6 max-w-xl text-base text-white/85 md:text-lg"
        >
          Premium Hair & Beauty Experience für Frauen und Familien.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button href="#booking" size="lg">
            Termin buchen
          </Button>
          <Button href="#services" variant="outline" size="lg" className="!border-white/40 !text-white hover:!bg-white/20">
            Leistungen entdecken
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 p-2"
        >
          <div className="h-1.5 w-1 rounded-full bg-white/80" />
        </motion.div>
      </motion.div>
    </section>
  );
}
