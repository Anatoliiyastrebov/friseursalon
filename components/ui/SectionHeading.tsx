"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  label?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  label,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "mb-14 md:mb-16",
        align === "center" && "mx-auto max-w-2xl text-center",
        className
      )}
    >
      {label && (
        <span className="mb-4 inline-block font-sans text-xs font-medium uppercase tracking-[0.25em] text-warm-gray">
          {label}
        </span>
      )}
      <h2 className="font-serif text-4xl font-light leading-tight text-black md:text-5xl lg:text-6xl">
        {title}
      </h2>
      {description && (
        <p className="mt-5 text-base leading-relaxed text-warm-gray md:text-lg">
          {description}
        </p>
      )}
    </motion.div>
  );
}
