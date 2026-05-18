"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Sparkles, Heart, Award, Leaf } from "lucide-react";
import { images } from "@/data/images";

const highlights = [
  {
    icon: Award,
    title: "Erfahrung",
    text: "Über 15 Jahre Expertise in Premium-Friseurkunst und Coloration.",
  },
  {
    icon: Heart,
    title: "Individuell",
    text: "Jeder Look wird persönlich auf Sie, Ihren Typ und Ihren Alltag abgestimmt.",
  },
  {
    icon: Sparkles,
    title: "Familie",
    text: "Ein warmer Ort für Frauen, Männer und Kinder – willkommen wie zu Hause.",
  },
  {
    icon: Leaf,
    title: "Premium Produkte",
    text: "Ausgewählte Salonpflege ohne Kompromisse – schonend und hochwirksam.",
  },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-white">
      <div className="container-luxury">
        <SectionHeading
          label="Über uns"
          title="Wo Schönheit auf Herzlichkeit trifft"
          description="Mira Beauty Lounge wurde mit einer Vision gegründet: einen Ort zu schaffen, an dem sich jede Gästin und jeder Gast wertgeschätzt fühlt."
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <AnimateOnScroll direction="left">
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
                <Image
                  src={images.about}
                  alt="Stylistin bei der Arbeit im Salon"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="glass absolute -bottom-6 -right-4 rounded-2xl p-6 shadow-xl md:-right-8"
              >
                <p className="font-serif text-4xl font-light text-black">15+</p>
                <p className="text-sm text-warm-gray">Jahre Erfahrung</p>
              </motion.div>
              <div className="absolute -left-4 -top-4 -z-10 h-full w-full rounded-3xl bg-soft-pink/40" />
            </div>
          </AnimateOnScroll>

          <AnimateOnScroll direction="right" delay={0.15}>
            <div className="space-y-6">
              <p className="text-lg leading-relaxed text-black/80">
                In unserem Salon in der Münchner Innenstadt verbinden wir
                handwerkliche Perfektion mit einer Atmosphäre, die zum
                Entspannen einlädt. Ob Balayage, Braut-Styling oder der erste
                Haarschnitt Ihres Kindes – wir nehmen uns Zeit für Sie.
              </p>
              <p className="leading-relaxed text-warm-gray">
                Unser Team aus leidenschaftlichen Stylistinnen und Stylisten
                bildet sich kontinuierlich weiter und arbeitet ausschließlich
                mit hochwertigen Produkten. Qualität, Hygiene und ein
                unaufdringlicher Service stehen bei uns an erster Stelle.
              </p>
              <div className="grid gap-4 pt-4 sm:grid-cols-2">
                {highlights.map((item, i) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="rounded-2xl border border-beige-dark/60 bg-beige/30 p-5 transition-shadow hover:shadow-md"
                  >
                    <item.icon className="mb-3 h-5 w-5 text-soft-pink-accent" strokeWidth={1.5} />
                    <h4 className="font-medium text-black">{item.title}</h4>
                    <p className="mt-1 text-sm text-warm-gray">{item.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
