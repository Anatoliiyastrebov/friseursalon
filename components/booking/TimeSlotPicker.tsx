"use client";

import { cn } from "@/lib/utils";
import type { TimeSlot } from "@/data/booking";

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  loading: boolean;
  value: string;
  onSelect: (time: string) => void;
  error?: string;
}

const noticeClass =
  "rounded-2xl border border-beige-dark/80 bg-white/60 px-5 py-3.5 text-sm text-warm-gray";

export function TimeSlotPicker({ slots, loading, value, onSelect, error }: TimeSlotPickerProps) {
  return (
    <div>
      <span className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-gray">
        Uhrzeit *
      </span>
      {loading ? (
        <p className={noticeClass}>Verfügbare Zeiten werden geladen...</p>
      ) : slots.length === 0 ? (
        <p className={noticeClass}>
          An diesem Tag ist der Salon geschlossen. Bitte wählen Sie ein anderes Datum.
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
          {slots.map((slot) => {
            const isSelected = value === slot.time;
            return (
              <button
                key={slot.time}
                type="button"
                disabled={!slot.available}
                onClick={() => onSelect(slot.time)}
                aria-pressed={isSelected}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-sm transition-all",
                  !slot.available
                    ? "cursor-not-allowed border-beige-dark/50 bg-beige/40 text-warm-gray-light line-through"
                    : isSelected
                      ? "border-black bg-black text-white"
                      : "border-beige-dark/80 bg-white/80 text-black hover:border-black/40"
                )}
              >
                {slot.time}
              </button>
            );
          })}
        </div>
      )}
      {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
    </div>
  );
}
