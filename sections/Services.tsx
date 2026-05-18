"use client";

import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services } from "@/data/services";
import { Button } from "@/components/ui/Button";

export function Services() {
  return (
    <section id="services" className="section-padding luxury-gradient">
      <div className="container-luxury">
        <SectionHeading
          label="Leistungen"
          title="Unsere Services"
          description="Von klassischen Schnitten bis zu aufwendigen Colorationen – entdecken Sie unser sorgfältig kuratiertes Angebot."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, i) => (
            <motion.article
              key={service.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.06, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group glass cursor-default rounded-3xl p-6 transition-shadow duration-500 hover:shadow-xl"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-pink/60 text-black transition-colors group-hover:bg-black group-hover:text-white">
                <ServiceIcon name={service.icon} />
              </div>
              <h3 className="font-serif text-xl text-black">{service.name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                {service.description}
              </p>
              <div className="mt-5 flex items-end justify-between border-t border-black/5 pt-4">
                <span className="font-medium text-black">{service.price}</span>
                {service.duration && (
                  <span className="text-xs text-warm-gray">{service.duration}</span>
                )}
              </div>
            </motion.article>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 text-center text-sm text-warm-gray"
        >
          Alle Preise sind Richtwerte. Der finale Preis wird nach persönlicher Beratung festgelegt.
        </motion.p>

        <div className="mt-8 flex justify-center">
          <Button href="#booking">Beratungstermin vereinbaren</Button>
        </div>
      </div>
    </section>
  );
}
