"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { instagramPosts } from "@/data/gallery";
import { siteConfig } from "@/data/site";

export function InstagramSection() {
  return (
    <section id="instagram" className="section-padding bg-white">
      <div className="container-luxury">
        <SectionHeading
          label="Instagram"
          title="Folgen Sie uns"
          description="@mirabeautylounge – tägliche Inspiration, Behind the Scenes und unsere neuesten Looks."
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6 lg:gap-4">
          {instagramPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ scale: 1.03 }}
              className="group relative aspect-square overflow-hidden rounded-2xl"
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 16vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/40">
                <InstagramIcon className="h-8 w-8 text-white opacity-0 transition-opacity group-hover:opacity-100" />
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={siteConfig.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-black transition-colors hover:text-warm-gray"
          >
            <InstagramIcon className="h-4 w-4" />
            @mirabeautylounge auf Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
