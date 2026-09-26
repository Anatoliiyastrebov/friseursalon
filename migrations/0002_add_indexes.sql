-- Migration number: 0002 	 2026-09-24T13:32:16.949Z

-- Fuer die Verfuegbarkeits-Abfrage (GET /api/availability?date=...).
CREATE INDEX IF NOT EXISTS bookings_date_idx ON bookings (date);

-- Verhindert Doppelbuchungen auf Datenbankebene (statt nur im Code):
-- zwei aktive (nicht stornierte) Buchungen koennen nie denselben
-- Datum+Uhrzeit-Slot belegen. Ein INSERT, der das verletzt, wirft einen
-- Constraint-Fehler, den der Worker als HTTP 409 beantwortet.
CREATE UNIQUE INDEX IF NOT EXISTS bookings_date_time_active_idx
  ON bookings (date, time)
  WHERE status != 'storniert';
