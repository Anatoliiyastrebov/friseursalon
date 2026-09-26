"use client";

import { Check, Globe, Mail, Phone, Trash2 } from "lucide-react";
import { cn, formatPhoneLink } from "@/lib/utils";
import type { AdminBooking } from "@/types";

interface BookingRowProps {
  booking: AdminBooking;
  isPast: boolean;
  busy: boolean;
  onConfirm: (booking: AdminBooking) => void;
  onDelete: (booking: AdminBooking) => void;
}

export function BookingRow({ booking, isPast, busy, onConfirm, onDelete }: BookingRowProps) {
  const confirmed = booking.status === "bestaetigt";
  const SourceIcon = booking.source === "telefon" ? Phone : Globe;

  return (
    <li
      className={cn(
        "glass flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:gap-6 sm:p-5",
        isPast && "opacity-70"
      )}
    >
      <p className="font-serif text-2xl font-medium lining-nums tabular-nums text-black sm:w-16 sm:shrink-0">{booking.time}</p>

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex flex-wrap items-center gap-2">
          <p className="font-medium text-black">{booking.name}</p>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[11px] font-medium",
              confirmed ? "bg-emerald-50 text-emerald-800" : "bg-soft-pink text-black"
            )}
          >
            {confirmed ? "Bestätigt" : "Neu"}
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] text-warm-gray">
            <SourceIcon aria-hidden className="h-3 w-3" />
            {booking.source === "telefon" ? "Telefon" : "Online"}
          </span>
        </div>
        <p className="text-sm text-black/80">{booking.service}</p>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-warm-gray">
          {booking.phone && (
            <a href={formatPhoneLink(booking.phone)} className="inline-flex items-center gap-1.5 transition-colors hover:text-black">
              <Phone aria-hidden className="h-3.5 w-3.5" />
              {booking.phone}
            </a>
          )}
          {booking.email && (
            <a href={`mailto:${booking.email}`} className="inline-flex items-center gap-1.5 break-all transition-colors hover:text-black">
              <Mail aria-hidden className="h-3.5 w-3.5" />
              {booking.email}
            </a>
          )}
          {!booking.phone && !booking.email && <span>Keine Kontaktdaten</span>}
        </div>
        {booking.message && (
          <p className="text-sm italic text-warm-gray">„{booking.message}“</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-2">
        {!confirmed && (
          <button
            type="button"
            disabled={busy}
            onClick={() => onConfirm(booking)}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/15 bg-white/70 px-4 py-2 text-xs font-medium text-black transition-colors hover:bg-white disabled:opacity-50"
          >
            <Check aria-hidden className="h-3.5 w-3.5" />
            Bestätigen
          </button>
        )}
        <button
          type="button"
          disabled={busy}
          aria-label={`Termin von ${booking.name} löschen`}
          onClick={() => onDelete(booking)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-red-200 bg-white/70 text-red-600 transition-colors hover:bg-red-50 disabled:opacity-50"
        >
          <Trash2 aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </li>
  );
}
