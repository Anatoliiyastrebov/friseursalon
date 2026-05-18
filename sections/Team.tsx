"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { teamMembers } from "@/data/team";

export function Team() {
  return (
    <section id="team" className="section-padding bg-beige/40">
      <div className="container-luxury">
        <SectionHeading
          label="Unser Team"
          title="Die Gesichter hinter Mira"
          description="Leidenschaftliche Expertinnen, die Ihre Schönheit mit Feingefühl und Präzision zum Strahlen bringen."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {teamMembers.map((member, i) => (
            <motion.article
              key={member.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                {member.social.instagram && (
                  <a
                    href={member.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Instagram von ${member.name}`}
                    className="absolute bottom-4 right-4 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                  >
                    <InstagramIcon className="h-4 w-4" />
                  </a>
                )}
              </div>
              <div className="mt-5">
                <h3 className="font-serif text-xl text-black">{member.name}</h3>
                <p className="mt-1 text-sm font-medium text-soft-pink-accent">
                  {member.role}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-warm-gray">
                  {member.bio}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
