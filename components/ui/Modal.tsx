"use client";

import { useEffect, useId, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  size?: "sm" | "md";
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, description, size = "md", children }: ModalProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const firstField = panelRef.current?.querySelector<HTMLElement>(
      "input, textarea, [role=combobox], button:not([data-modal-close])"
    );
    firstField?.focus();
    return () => {
      document.body.style.overflow = "";
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/40 px-4 py-8 backdrop-blur-sm sm:py-16"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            onKeyDown={(e) => {
              // Innere Popover (Kalender, Auswahl) markieren Escape als behandelt.
              if (e.key === "Escape" && !e.defaultPrevented) onClose();
            }}
            className={cn(
              "mx-auto rounded-3xl border border-white/70 bg-background p-6 shadow-2xl shadow-black/20 sm:p-8",
              size === "sm" ? "max-w-md" : "max-w-xl"
            )}
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id={titleId} className="font-serif text-2xl text-black">
                  {title}
                </h2>
                {description && <p className="mt-1 text-sm text-warm-gray">{description}</p>}
              </div>
              <button
                type="button"
                data-modal-close
                aria-label="Schließen"
                onClick={onClose}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/5 text-black transition-colors hover:bg-black/10"
              >
                <X aria-hidden className="h-4 w-4" />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
