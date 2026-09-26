-- Herkunft einer Buchung: "online" (Formular auf der Website) oder
-- "telefon" (vom Salon-Admin manuell eingetragen).
ALTER TABLE bookings ADD COLUMN source TEXT NOT NULL DEFAULT 'online';
