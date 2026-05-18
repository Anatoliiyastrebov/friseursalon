"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { galleryImages } from "@/data/gallery";

export function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const goNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % galleryImages.length);
  };

  const goPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex(
      (lightboxIndex - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <section id="gallery" className="section-padding bg-white">
      <div className="container-luxury">
        <SectionHeading
          label="Galerie"
          title="Inspiration & Looks"
          description="Ein Einblick in unsere Arbeit – natürliche Farben, präzise Schnitte und zeitlose Eleganz."
        />

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
          {galleryImages.map((image, i) => (
            <motion.button
              key={image.id}
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              onClick={() => openLightbox(i)}
              className="group relative mb-4 block w-full overflow-hidden rounded-2xl break-inside-avoid focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
            >
              <div
                className="relative w-full"
                style={{ aspectRatio: `${image.width}/${image.height}` }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            <button
              type="button"
              onClick={closeLightbox}
              aria-label="Schließen"
              className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              aria-label="Vorheriges Bild"
              className="absolute left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:left-8"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              aria-label="Nächstes Bild"
              className="absolute right-4 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 md:right-8"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[85vh] max-w-5xl overflow-hidden rounded-2xl"
            >
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                width={galleryImages[lightboxIndex].width}
                height={galleryImages[lightboxIndex].height}
                className="max-h-[85vh] w-auto object-contain"
              />
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-center text-sm text-white">
                {galleryImages[lightboxIndex].alt}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
