"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navLinks, siteConfig } from "@/data/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <nav
          className={cn(
            "mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-8",
            scrolled && "glass rounded-full px-6 py-3 shadow-sm md:mx-8 lg:mx-auto"
          )}
        >
          <Link href="/" className="group flex flex-col">
            <span className="font-serif text-xl font-medium tracking-wide text-black md:text-2xl">
              Mira
            </span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-warm-gray transition-colors group-hover:text-black">
              Beauty Lounge
            </span>
          </Link>

          <ul className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-warm-gray transition-colors hover:text-black"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <Button href="#booking" size="sm">
              Termin buchen
            </Button>
          </div>

          <button
            type="button"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-black/5 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 glass lg:hidden"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex h-full flex-col items-center justify-center gap-8 p-8"
            >
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    className="font-serif text-3xl text-black"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Button href="#booking" onClick={() => setMobileOpen(false)}>
                Termin buchen
              </Button>
              <a
                href={siteConfig.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-warm-gray"
              >
                @{siteConfig.name.replace(/\s/g, "").toLowerCase()}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
