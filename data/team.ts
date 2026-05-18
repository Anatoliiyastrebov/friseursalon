import type { TeamMember } from "@/types";
import { images } from "@/data/images";

export const teamMembers: TeamMember[] = [
  {
    id: "mira",
    name: "Mira Schneider",
    role: "Inhaberin & Master Stylistin",
    bio: "Über 15 Jahre Erfahrung in Premium-Salons. Spezialisiert auf Balayage und individuelle Farbkonzepte.",
    image: images.team.mira,
    social: { instagram: "https://instagram.com" },
  },
  {
    id: "lena",
    name: "Lena Hoffmann",
    role: "Color Expertin",
    bio: "Leidenschaft für natürliche Farbverläufe und schonende Pflege. Ihre Kundinnen vertrauen ihr blind.",
    image: images.team.lena,
    social: { instagram: "https://instagram.com" },
  },
  {
    id: "sophie",
    name: "Sophie Weber",
    role: "Beauty & Make-up Artist",
    bio: "Vom Braut-Make-up bis zum Business-Look – Sophie versteht es, Schönheit subtil zu betonen.",
    image: images.team.sophie,
    social: { instagram: "https://instagram.com" },
  },
  {
    id: "anna",
    name: "Anna Krüger",
    role: "Stylistin & Kinder-Spezialistin",
    bio: "Warmherzig und geduldig – Anna macht den Salonbesuch auch für die Kleinsten zum Vergnügen.",
    image: images.team.anna,
    social: { instagram: "https://instagram.com" },
  },
];
