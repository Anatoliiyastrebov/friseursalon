// Arbeitszeiten je Wochentag (0 = Sonntag ... 6 = Samstag).
// "closed: true" blendet den Tag als geschlossen aus.
// Passt sich an die Öffnungszeiten aus data/site.ts an – bei Änderungen dort bitte auch hier anpassen.
export interface DayWorkingHours {
  closed?: boolean;
  start?: string; // "HH:MM"
  end?: string; // "HH:MM"
}

export const workingHours: Record<number, DayWorkingHours> = {
  0: { closed: true }, // Sonntag
  1: { closed: true }, // Montag
  2: { start: "09:00", end: "19:00" }, // Dienstag
  3: { start: "09:00", end: "19:00" }, // Mittwoch
  4: { start: "09:00", end: "19:00" }, // Donnerstag
  5: { start: "09:00", end: "19:00" }, // Freitag
  6: { start: "09:00", end: "17:00" }, // Samstag
};

// Dauer eines Termin-Slots in Minuten.
export const slotDurationMinutes = 30;

function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toTimeString(minutes: number): string {
  const h = Math.floor(minutes / 60)
    .toString()
    .padStart(2, "0");
  const m = (minutes % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

const SALON_TIMEZONE = "Europe/Berlin";

/**
 * Heutiges Datum und Uhrzeit in Europe/Berlin (CET/CEST) statt der
 * Server-Zeitzone (auf Vercel/Cloudflare Workers ist das UTC), damit die
 * "schon vorbei"-Prüfung unten nicht je nach Jahreszeit 1-2 Stunden daneben
 * liegt.
 */
function getBerlinNow(): { dateStr: string; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: SALON_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";

  return {
    dateStr: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

/** Heutiges Datum (YYYY-MM-DD) in Europe/Berlin. */
export function getBerlinToday(): string {
  return getBerlinNow().dateStr;
}

/** Wochentag (0 = Sonntag) eines Kalenderdatums, unabhängig von der Server-Zeitzone. */
function getWeekday(dateStr: string): number {
  return new Date(`${dateStr}T00:00:00Z`).getUTCDay();
}

/** Ist der Salon an diesem Datum (YYYY-MM-DD) grundsätzlich geöffnet? */
export function isSalonOpenOn(dateStr: string): boolean {
  const hours = workingHours[getWeekday(dateStr)];
  return Boolean(hours && !hours.closed && hours.start && hours.end);
}

/**
 * Liefert alle Zeit-Slots für ein Datum (YYYY-MM-DD), inklusive
 * Verfügbarkeit: bereits vergangene Uhrzeiten (heute) und die in
 * `bookedTimes` übergebenen, bereits vergebenen Slots werden als nicht
 * verfügbar markiert. `bookedTimes` kommt aus der Datenbank (siehe
 * app/api/availability/route.ts). Gibt ein leeres Array zurück, wenn der
 * Salon an diesem Tag geschlossen ist.
 */
export function computeSlotsForDate(
  dateStr: string,
  bookedTimes: string[]
): TimeSlot[] {
  if (!dateStr) return [];

  const hours = workingHours[getWeekday(dateStr)];

  if (!hours || hours.closed || !hours.start || !hours.end) return [];

  const startMinutes = toMinutes(hours.start);
  const endMinutes = toMinutes(hours.end);
  const booked = new Set(bookedTimes);

  const { dateStr: todayInBerlin, minutes: nowMinutes } = getBerlinNow();
  const isToday = dateStr === todayInBerlin;

  const slots: TimeSlot[] = [];
  for (
    let minutes = startMinutes;
    minutes < endMinutes;
    minutes += slotDurationMinutes
  ) {
    const time = toTimeString(minutes);
    const isPast = isToday && minutes <= nowMinutes;
    slots.push({ time, available: !booked.has(time) && !isPast });
  }

  return slots;
}
