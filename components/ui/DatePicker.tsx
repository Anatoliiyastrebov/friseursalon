"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];

const dayFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});
const monthFormat = new Intl.DateTimeFormat("de-DE", {
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

const pad = (n: number) => String(n).padStart(2, "0");
const toDateStr = (y: number, m: number, d: number) => `${y}-${pad(m + 1)}-${pad(d)}`;

function parseDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return { y, m: m - 1, d };
}

function utcDate(y: number, m: number, d: number) {
  return new Date(Date.UTC(y, m, d));
}

interface DatePickerProps {
  id: string;
  /** Ausgewähltes Datum als YYYY-MM-DD (oder leer). */
  value: string;
  onChange: (value: string) => void;
  /** Heutiges Datum (YYYY-MM-DD); frühere Tage sind nicht wählbar. */
  today: string;
  isDateDisabled?: (dateStr: string) => boolean;
  placeholder: string;
  invalid?: boolean;
}

export function DatePicker({
  id,
  value,
  onChange,
  today,
  isDateDisabled,
  placeholder,
  invalid,
}: DatePickerProps) {
  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ y: 0, m: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = `${id}-calendar`;

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const minMonth = parseDate(today);
  const atMinMonth = view.y === minMonth.y && view.m === minMonth.m;

  const isDisabled = (dateStr: string) =>
    dateStr < today || Boolean(isDateDisabled?.(dateStr));

  const toggle = () => {
    if (!open) {
      const base = parseDate(value || today);
      setView({ y: base.y, m: base.m });
    }
    setOpen(!open);
  };

  const shiftMonth = (delta: number) => {
    const next = utcDate(view.y, view.m + delta, 1);
    setView({ y: next.getUTCFullYear(), m: next.getUTCMonth() });
  };

  const select = (dateStr: string) => {
    onChange(dateStr);
    setOpen(false);
    triggerRef.current?.focus();
  };

  const focusDay = (dateStr: string) => {
    requestAnimationFrame(() => {
      containerRef.current
        ?.querySelector<HTMLButtonElement>(`[data-date="${dateStr}"]`)
        ?.focus();
    });
  };

  const onGridKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    const current = (e.target as HTMLElement).dataset.date;
    const deltas: Record<string, number> = {
      ArrowLeft: -1,
      ArrowRight: 1,
      ArrowUp: -7,
      ArrowDown: 7,
    };
    if (!current || !(e.key in deltas)) return;
    e.preventDefault();
    const { y, m, d } = parseDate(current);
    const target = utcDate(y, m, d + deltas[e.key]);
    const targetStr = toDateStr(target.getUTCFullYear(), target.getUTCMonth(), target.getUTCDate());
    if (targetStr < today) return;
    if (target.getUTCFullYear() !== view.y || target.getUTCMonth() !== view.m) {
      setView({ y: target.getUTCFullYear(), m: target.getUTCMonth() });
    }
    focusDay(targetStr);
  };

  const firstWeekday = (utcDate(view.y, view.m, 1).getUTCDay() + 6) % 7;
  const daysInMonth = utcDate(view.y, view.m + 1, 0).getUTCDate();
  const selectedParts = value ? parseDate(value) : null;
  const label = selectedParts
    ? dayFormat.format(utcDate(selectedParts.y, selectedParts.m, selectedParts.d))
    : "";

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={triggerRef}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={toggle}
        className={cn(
          "flex w-full items-center justify-between gap-3 rounded-2xl border bg-white/80 px-5 py-3.5 text-left text-sm outline-none transition-all focus-visible:border-black/20 focus-visible:ring-2 focus-visible:ring-soft-pink/50",
          open ? "border-black/20 ring-2 ring-soft-pink/50" : "border-beige-dark/80",
          invalid && !open && "border-red-300"
        )}
      >
        <span className={cn("truncate", value ? "text-black" : "text-warm-gray-light")}>
          {value ? label : placeholder}
        </span>
        <CalendarDays aria-hidden className="h-4 w-4 shrink-0 text-warm-gray" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="dialog"
            aria-label="Datum auswählen"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="absolute left-0 right-0 z-30 mt-2 rounded-2xl border border-white/70 bg-white/95 p-4 shadow-xl shadow-black/10 backdrop-blur-xl sm:left-auto sm:w-[20rem]"
          >
            <div className="mb-3 flex items-center justify-between">
              <button
                type="button"
                aria-label="Vorheriger Monat"
                disabled={atMinMonth}
                onClick={() => shiftMonth(-1)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-beige disabled:cursor-not-allowed disabled:text-warm-gray-light disabled:hover:bg-transparent"
              >
                <ChevronLeft aria-hidden className="h-4 w-4" />
              </button>
              <p aria-live="polite" className="font-serif text-lg capitalize text-black">
                {monthFormat.format(utcDate(view.y, view.m, 1))}
              </p>
              <button
                type="button"
                aria-label="Nächster Monat"
                onClick={() => shiftMonth(1)}
                className="flex h-9 w-9 items-center justify-center rounded-full text-black transition-colors hover:bg-beige"
              >
                <ChevronRight aria-hidden className="h-4 w-4" />
              </button>
            </div>

            <div className="mb-1 grid grid-cols-7 text-center text-[11px] font-medium uppercase tracking-wider text-warm-gray">
              {WEEKDAYS.map((day) => (
                <span key={day} className="py-1">
                  {day}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-y-1" onKeyDown={onGridKeyDown}>
              {Array.from({ length: firstWeekday }, (_, i) => (
                <span key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }, (_, i) => {
                const day = i + 1;
                const dateStr = toDateStr(view.y, view.m, day);
                const disabled = isDisabled(dateStr);
                const isSelected = dateStr === value;
                const isToday = dateStr === today;
                return (
                  <button
                    key={dateStr}
                    type="button"
                    data-date={dateStr}
                    disabled={disabled}
                    aria-pressed={isSelected}
                    aria-current={isToday ? "date" : undefined}
                    onClick={() => select(dateStr)}
                    className={cn(
                      "mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition-colors outline-none focus-visible:ring-2 focus-visible:ring-soft-pink-accent",
                      disabled && "cursor-not-allowed text-warm-gray-light/70",
                      !disabled && !isSelected && "text-black hover:bg-beige",
                      isSelected && "bg-black text-white",
                      isToday && !isSelected && "ring-1 ring-black/25"
                    )}
                  >
                    {day}
                  </button>
                );
              })}
            </div>

            <p className="mt-3 border-t border-beige-dark/60 pt-3 text-center text-xs text-warm-gray">
              Ausgegraute Tage: Salon geschlossen oder nicht mehr buchbar.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
