import { NextResponse } from "next/server";
import { computeSlotsForDate } from "@/data/booking";
import { services } from "@/data/services";
import { getDb } from "@/lib/db";

export type BookingSource = "online" | "telefon";
export type BookingStatus = "neu" | "bestaetigt";
export const BOOKING_STATUSES: BookingStatus[] = ["neu", "bestaetigt"];

interface BookingInput {
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string;
  time: string;
  message: string | null;
}

const PHONE_RE = /^[\d\s+\-()/]{5,30}$/;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function isRealDate(dateStr: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) return false;
  const d = new Date(`${dateStr}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().startsWith(dateStr);
}

/**
 * Serverseitige Prüfung – das Frontend wird nie als Vertrauensgrenze behandelt.
 * `requireContact`: Online-Buchungen brauchen Telefon UND E-Mail; der Admin darf
 * Telefonbuchungen mit nur einem (oder keinem) Kontaktweg eintragen.
 */
function parseBooking(
  raw: unknown,
  requireContact: boolean
): { value: BookingInput } | { error: string } {
  const data = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const value: BookingInput = {
    name: text(data.name),
    phone: text(data.phone),
    email: text(data.email),
    service: text(data.service),
    date: text(data.date),
    time: text(data.time),
    message: text(data.message) || null,
  };

  if (value.name.length < 2 || value.name.length > 100) return { error: "Name fehlt oder ist ungültig." };
  if (requireContact && !value.phone) return { error: "Telefon fehlt." };
  if (requireContact && !value.email) return { error: "E-Mail fehlt." };
  if (value.phone && !PHONE_RE.test(value.phone)) return { error: "Ungültige Telefonnummer." };
  if (value.email && (!EMAIL_RE.test(value.email) || value.email.length > 200)) {
    return { error: "Ungültige E-Mail-Adresse." };
  }
  if (!services.some((s) => s.name === value.service)) return { error: "Leistung ungültig." };
  if (!isRealDate(value.date)) return { error: "Datum ungültig." };
  if (value.message && value.message.length > 1000) return { error: "Nachricht ist zu lang." };

  const slot = computeSlotsForDate(value.date, []).find((s) => s.time === value.time);
  if (!slot?.available) {
    return { error: "Dieser Zeitpunkt ist nicht buchbar (geschlossen, außerhalb der Öffnungszeiten oder bereits vorbei)." };
  }

  return { value };
}

export function isUniqueConstraintError(err: unknown): boolean {
  return err instanceof Error && /UNIQUE constraint failed/i.test(err.message);
}

/** Gemeinsamer Handler für Online-Buchung und Admin-Telefonbuchung. */
export async function handleCreateBooking(
  request: Request,
  options: { source: BookingSource; requireContact: boolean }
): Promise<NextResponse> {
  const body = await request.json().catch(() => null);
  const parsed = parseBooking(body, options.requireContact);
  if ("error" in parsed) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
  const b = parsed.value;

  let db;
  try {
    db = await getDb();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Serverkonfiguration fehlt." },
      { status: 500 }
    );
  }

  const id = crypto.randomUUID();

  // Die Doppelbuchungs-Sicherung ist der partial UNIQUE index in der Datenbank
  // (migrations/0002): ein INSERT auf einen vergebenen Slot schlägt atomar fehl.
  try {
    await db
      .prepare(
        `INSERT INTO bookings (id, name, phone, email, service, date, time, message, status, source)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, 'neu', ?9)`
      )
      .bind(id, b.name, b.phone, b.email, b.service, b.date, b.time, b.message, options.source)
      .run();
  } catch (err) {
    if (isUniqueConstraintError(err)) {
      return NextResponse.json(
        { error: "Dieser Termin ist bereits vergeben. Bitte wählen Sie eine andere Uhrzeit." },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Unbekannter Fehler." },
      { status: 500 }
    );
  }

  const booking = await db.prepare("SELECT * FROM bookings WHERE id = ?1").bind(id).first();
  return NextResponse.json({ booking }, { status: 201 });
}
