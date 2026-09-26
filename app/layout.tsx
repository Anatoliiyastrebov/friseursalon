import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { siteConfig } from "@/data/site";
import { images } from "@/data/images";
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
        url: images.og,
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
    images: [images.og],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/icon", type: "image/png" }],
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
