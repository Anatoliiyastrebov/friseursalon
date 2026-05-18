import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/layout/BackToTop";
import { siteConfig } from "@/data/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mirabeautylounge.de"),
  title: {
    default: `${siteConfig.name} | Premium Friseur & Beauty München`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "Friseursalon München",
    "Beauty Lounge",
    "Balayage München",
    "Damenfriseur",
    "Familienfriseur",
    "Premium Salon",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "https://mirabeautylounge.de",
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Premium Friseur & Beauty München`,
    description: siteConfig.description,
    images: [
      {
        url: "https://images.unsplash.com/photo-1521590832167-7bcbfda6381f?w=1200&h=630&fit=crop&q=85",
        width: 1200,
        height: 630,
        alt: "Mira Beauty Lounge Salon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Premium Friseur München`,
    description: siteConfig.description,
    images: [
      "https://images.unsplash.com/photo-1521590832167-7bcbfda6381f?w=1200&h=630&fit=crop&q=85",
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: siteConfig.name,
  description: siteConfig.description,
  image:
    "https://images.unsplash.com/photo-1521590832167-7bcbfda6381f?w=1200&h=630&fit=crop&q=85",
  telephone: siteConfig.phone,
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    postalCode: siteConfig.address.zip,
    addressCountry: "DE",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "19:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "17:00",
    },
  ],
  priceRange: "€€",
  url: "https://mirabeautylounge.de",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
