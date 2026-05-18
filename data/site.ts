import type { SiteConfig } from "@/types";

export const siteConfig: SiteConfig = {
  name: "Mira Beauty Lounge",
  tagline: "Your Beauty. Your Style.",
  description:
    "Premium Friseur- und Beauty-Erlebnis für Frauen und Familien in München. Individuelle Beratung, erfahrene Stylisten und luxuriöse Pflegeprodukte.",
  address: {
    street: "Maximilianstraße 28",
    city: "München",
    zip: "80539",
    country: "Deutschland",
  },
  phone: "+49 89 234 567 89",
  email: "hello@mirabeautylounge.de",
  instagram: "https://instagram.com/mirabeautylounge",
  openingHours: [
    { day: "Montag", hours: "Geschlossen" },
    { day: "Dienstag – Freitag", hours: "09:00 – 19:00" },
    { day: "Samstag", hours: "09:00 – 17:00" },
    { day: "Sonntag", hours: "Geschlossen" },
  ],
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2661.5!2d11.5820!3d48.1391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e75f0b0c0c0c1%3A0x0!2sMaximilianstra%C3%9Fe%2C%20M%C3%BCnchen!5e0!3m2!1sde!2sde!4v1",
};

export const navLinks = [
  { label: "Über uns", href: "#about" },
  { label: "Leistungen", href: "#services" },
  { label: "Galerie", href: "#gallery" },
  { label: "Team", href: "#team" },
  { label: "FAQ", href: "#faq" },
  { label: "Kontakt", href: "#contact" },
];
