import Link from "next/link";
import { InstagramIcon } from "@/components/ui/InstagramIcon";
import { navLinks, siteConfig } from "@/data/site";
import { formatPhoneLink } from "@/lib/utils";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-beige-dark bg-beige/50">
      <div className="container-luxury section-padding !py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl font-medium text-black">
                Mira
              </span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.3em] text-warm-gray">
                Beauty Lounge
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-warm-gray">
              Premium Friseur- und Beauty-Erlebnis im Herzen Münchens.
            </p>
            <a
              href={siteConfig.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="mt-6 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-black hover:text-white"
            >
              <InstagramIcon className="h-4 w-4" />
            </a>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-warm-gray">
              Navigation
            </h3>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-black/80 transition-colors hover:text-black"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="#booking"
                  className="text-sm text-black/80 transition-colors hover:text-black"
                >
                  Termin buchen
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-warm-gray">
              Kontakt
            </h3>
            <address className="space-y-2 text-sm not-italic text-black/80">
              <p>
                {siteConfig.address.street}
                <br />
                {siteConfig.address.zip} {siteConfig.address.city}
              </p>
              <a
                href={formatPhoneLink(siteConfig.phone)}
                className="block transition-colors hover:text-black"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="block transition-colors hover:text-black"
              >
                {siteConfig.email}
              </a>
            </address>
          </div>

          <div>
            <h3 className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-warm-gray">
              Öffnungszeiten
            </h3>
            <ul className="space-y-2 text-sm text-black/80">
              {siteConfig.openingHours.map((item) => (
                <li key={item.day} className="flex justify-between gap-4">
                  <span>{item.day}</span>
                  <span className="text-warm-gray">{item.hours}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-beige-dark pt-8 md:flex-row">
          <p className="text-xs text-warm-gray">
            © {year} {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-warm-gray md:justify-end">
            <Link href="#" className="hover:text-black">
              Impressum
            </Link>
            <Link href="#" className="hover:text-black">
              Datenschutz
            </Link>
            <span className="hidden text-warm-gray-light sm:inline">·</span>
            <span className="text-center md:text-right">
              Nur ein Design-Beispiel — keine echte Salon-Website.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
