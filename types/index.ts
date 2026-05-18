export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration?: string;
  icon: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    instagram?: string;
    linkedin?: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  service?: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface BookingFormData {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  message: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  address: {
    street: string;
    city: string;
    zip: string;
    country: string;
  };
  phone: string;
  email: string;
  instagram: string;
  openingHours: { day: string; hours: string }[];
  mapEmbedUrl: string;
}
