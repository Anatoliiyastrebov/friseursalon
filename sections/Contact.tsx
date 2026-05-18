"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import { formatPhoneLink } from "@/lib/utils";

const contactItems = [
  {
    icon: MapPin,
    title: "Adresse",
    content: (
      <>
        {siteConfig.address.street}
        <br />
        {siteConfig.address.zip} {siteConfig.address.city}
      </>
    ),
  },
  {
    icon: Phone,
    title: "Telefon",
    content: (
      <a
        href={formatPhoneLink(siteConfig.phone)}
        className="transition-colors hover:text-black"
      >
        {siteConfig.phone}
      </a>
    ),
  },
  {
    icon: Mail,
    title: "E-Mail",
    content: (
      <a
        href={`mailto:${siteConfig.email}`}
        className="transition-colors hover:text-black"
      >
        {siteConfig.email}
      </a>
    ),
  },
  {
    icon: Clock,
    title: "Öffnungszeiten",
    content: (
      <ul className="space-y-1">
        {siteConfig.openingHours.map((h) => (
          <li key={h.day} className="flex justify-between gap-4 text-sm">
            <span>{h.day}</span>
            <span className="text-warm-gray">{h.hours}</span>
          </li>
        ))}
      </ul>
    ),
  },
];

export function Contact() {
  return (
    <section id="contact" className="section-padding bg-beige/40">
      <div className="container-luxury">
        <SectionHeading
          label="Kontakt"
          title="Besuchen Sie uns"
          description="Im Herzen Münchens – wir freuen uns auf Ihren Besuch."
        />

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid gap-5 sm:grid-cols-2"
          >
            {contactItems.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="glass rounded-2xl p-6"
              >
                <item.icon className="mb-4 h-5 w-5 text-black" strokeWidth={1.5} />
                <h3 className="mb-2 text-xs font-medium uppercase tracking-wider text-warm-gray">
                  {item.title}
                </h3>
                <div className="text-sm leading-relaxed text-black/80">
                  {item.content}
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-3xl shadow-lg"
          >
            <iframe
              title="Mira Beauty Lounge Standort"
              src={siteConfig.mapEmbedUrl}
              width="100%"
              height="100%"
              className="min-h-[400px] w-full border-0 grayscale-[30%] transition-all duration-500 hover:grayscale-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
