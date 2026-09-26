-- Migration number: 0001 	 2026-09-24T13:32:16.032Z

-- Ersetzt die Supabase-Tabelle `bookings` (siehe altes supabase/schema.sql).
-- Angepasst an SQLite/D1: uuid -> TEXT, timestamptz -> TEXT (ISO 8601).
CREATE TABLE IF NOT EXISTS bookings (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT NOT NULL,
  date TEXT NOT NULL,
  time TEXT NOT NULL,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'neu',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);
