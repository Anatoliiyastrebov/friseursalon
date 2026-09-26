"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarPlus, ExternalLink, LogOut, Search } from "lucide-react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { BookingRow } from "@/components/admin/BookingRow";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { NewBookingDialog } from "@/components/admin/NewBookingDialog";
import { Button } from "@/components/ui/Button";
import { getBerlinToday } from "@/data/booking";
import { cn } from "@/lib/utils";
import type { AdminBooking } from "@/types";

type Filter = "upcoming" | "past" | "all";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "upcoming", label: "Anstehend" },
  { id: "past", label: "Vergangen" },
  { id: "all", label: "Alle" },
];

const headingFormat = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

function formatHeading(dateStr: string) {
  const [y, m, d] = dateStr.split("-").map(Number);
  return headingFormat.format(new Date(Date.UTC(y, m - 1, d)));
}

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loadError, setLoadError] = useState("");
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [query, setQuery] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<AdminBooking | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const [notice, setNotice] = useState("");

  const loadBookings = async () => {
    try {
      const res = await fetch("/api/bookings");
      if (res.status === 401) {
        setAuthenticated(false);
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { bookings?: AdminBooking[]; error?: string };
      if (!res.ok) {
        setLoadError(data.error || "Termine konnten nicht geladen werden.");
        setAuthenticated(true);
        return;
      }
      setBookings(data.bookings ?? []);
      setLoadError("");
      setAuthenticated(true);
    } catch {
      setLoadError("Keine Verbindung zum Server.");
      setAuthenticated(true);
    }
  };

  useEffect(() => {
    // Erst nach dem Mount laden (Mikrotask), nicht synchron im Effekt.
    queueMicrotask(loadBookings);
  }, []);

  const flash = (message: string) => {
    setNotice(message);
    setTimeout(() => setNotice(""), 4000);
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthenticated(false);
    setBookings([]);
  };

  const handleConfirm = async (booking: AdminBooking) => {
    setBusyId(booking.id);
    try {
      const res = await fetch(`/api/bookings/${booking.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "bestaetigt" }),
      });
      if (res.ok) {
        setBookings((prev) => prev.map((b) => (b.id === booking.id ? { ...b, status: "bestaetigt" } : b)));
        flash(`Termin von ${booking.name} bestätigt.`);
      } else {
        flash("Status konnte nicht geändert werden.");
      }
    } finally {
      setBusyId(null);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setBusyId(deleteTarget.id);
    setDeleteError("");
    try {
      const res = await fetch(`/api/bookings/${deleteTarget.id}`, { method: "DELETE" });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b.id !== deleteTarget.id));
        flash(`Termin von ${deleteTarget.name} gelöscht – der Zeitslot ist wieder frei.`);
        setDeleteTarget(null);
      } else {
        setDeleteError("Der Termin konnte nicht gelöscht werden.");
      }
    } catch {
      setDeleteError("Keine Verbindung zum Server.");
    } finally {
      setBusyId(null);
    }
  };

  const handleCreated = (booking: AdminBooking) => {
    setBookings((prev) =>
      [...prev, booking].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time))
    );
    setShowNew(false);
    setFilter("upcoming");
    flash(`Termin für ${booking.name} am ${formatHeading(booking.date)} um ${booking.time} gespeichert.`);
  };

  if (authenticated === null) {
    return (
      <div className="flex min-h-screen items-center justify-center text-sm text-warm-gray">
        Lädt…
      </div>
    );
  }

  if (!authenticated) {
    return <AdminLogin onSuccess={loadBookings} />;
  }

  const today = getBerlinToday();
  const needle = query.trim().toLowerCase();
  const matches = (b: AdminBooking) =>
    !needle ||
    [b.name, b.phone, b.email, b.service, b.message ?? ""].some((v) => v.toLowerCase().includes(needle));

  const visible = bookings
    .filter((b) => matches(b))
    .filter((b) => (filter === "upcoming" ? b.date >= today : filter === "past" ? b.date < today : true));
  if (filter === "past") visible.reverse();

  const groups: { date: string; items: AdminBooking[] }[] = [];
  for (const b of visible) {
    const last = groups[groups.length - 1];
    if (last?.date === b.date) last.items.push(b);
    else groups.push({ date: b.date, items: [b] });
  }

  const todayCount = bookings.filter((b) => b.date === today).length;
  const upcomingCount = bookings.filter((b) => b.date >= today).length;
  const unconfirmedCount = bookings.filter((b) => b.date >= today && b.status === "neu").length;

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-beige-dark/60 bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-5 py-3 md:px-8">
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-xl font-medium text-black">Mira</span>
            <span className="text-[10px] uppercase tracking-[0.3em] text-warm-gray">Terminverwaltung</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Link
              href="/"
              target="_blank"
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-warm-gray transition-colors hover:bg-black/5 hover:text-black"
            >
              <ExternalLink aria-hidden className="h-4 w-4" />
              <span className="hidden sm:inline">Website</span>
            </Link>
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-warm-gray transition-colors hover:bg-black/5 hover:text-black"
            >
              <LogOut aria-hidden className="h-4 w-4" />
              <span className="hidden sm:inline">Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-5 py-8 md:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl text-black">Termine</h1>
            <p className="mt-1 text-sm text-warm-gray">Alle Buchungen im Überblick – online und telefonisch.</p>
          </div>
          <Button size="sm" onClick={() => setShowNew(true)}>
            <CalendarPlus aria-hidden className="h-4 w-4" />
            Neuer Termin
          </Button>
        </div>

        <div className="mb-8 grid grid-cols-3 gap-3">
          {[
            { label: "Heute", value: todayCount },
            { label: "Anstehend", value: upcomingCount },
            { label: "Unbestätigt", value: unconfirmedCount },
          ].map((stat) => (
            <div key={stat.label} className="glass rounded-2xl p-4 text-center">
              <p className="font-serif text-3xl lining-nums text-black">{stat.value}</p>
              <p className="mt-1 text-[11px] uppercase tracking-wider text-warm-gray">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div role="tablist" aria-label="Terminfilter" className="inline-flex rounded-full bg-black/5 p-1">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={filter === f.id}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "rounded-full px-4 py-1.5 text-sm transition-colors",
                  filter === f.id ? "bg-black text-white" : "text-warm-gray hover:text-black"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="relative sm:w-64">
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-warm-gray" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Suchen (Name, Telefon …)"
              aria-label="Termine durchsuchen"
              className="w-full rounded-full border border-beige-dark/80 bg-white/80 py-2.5 pl-10 pr-4 text-sm text-black outline-none transition-all placeholder:text-warm-gray-light focus:border-black/20 focus:ring-2 focus:ring-soft-pink/50"
            />
          </div>
        </div>

        {loadError && (
          <p role="alert" className="mb-6 rounded-2xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">
            {loadError}
          </p>
        )}

        {groups.length === 0 && !loadError ? (
          <div className="glass rounded-3xl px-6 py-14 text-center">
            <p className="font-serif text-xl text-black">
              {needle ? "Keine Treffer" : filter === "past" ? "Keine vergangenen Termine" : "Keine anstehenden Termine"}
            </p>
            <p className="mt-2 text-sm text-warm-gray">
              {needle
                ? "Bitte einen anderen Suchbegriff versuchen."
                : "Neue Buchungen erscheinen hier automatisch – oder tragen Sie einen Anruf über „Neuer Termin“ ein."}
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {groups.map((group) => (
              <section key={group.date} aria-label={formatHeading(group.date)}>
                <h2 className="mb-3 flex items-baseline gap-3 text-sm font-medium text-black">
                  {formatHeading(group.date)}
                  {group.date === today && (
                    <span className="rounded-full bg-black px-2.5 py-0.5 text-[11px] font-medium text-white">Heute</span>
                  )}
                  <span className="text-xs font-normal text-warm-gray">
                    {group.items.length} {group.items.length === 1 ? "Termin" : "Termine"}
                  </span>
                </h2>
                <ul className="space-y-3">
                  {group.items.map((b) => (
                    <BookingRow
                      key={b.id}
                      booking={b}
                      isPast={b.date < today}
                      busy={busyId === b.id}
                      onConfirm={handleConfirm}
                      onDelete={(target) => {
                        setDeleteError("");
                        setDeleteTarget(target);
                      }}
                    />
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </main>

      <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] flex justify-center px-4">
        {notice && (
          <p className="pointer-events-auto max-w-md rounded-full bg-black px-5 py-3 text-center text-sm text-white shadow-xl">
            {notice}
          </p>
        )}
      </div>

      <NewBookingDialog open={showNew} onClose={() => setShowNew(false)} onCreated={handleCreated} />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Termin löschen?"
        message={
          deleteTarget
            ? `Der Termin von ${deleteTarget.name} am ${formatHeading(deleteTarget.date)} um ${deleteTarget.time} Uhr (${deleteTarget.service}) wird gelöscht. Der Zeitslot ist danach wieder frei buchbar.`
            : ""
        }
        confirmLabel="Löschen"
        busy={busyId !== null && busyId === deleteTarget?.id}
        error={deleteError}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </>
  );
}
