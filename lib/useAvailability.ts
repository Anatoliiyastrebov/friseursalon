"use client";

import { useEffect, useState } from "react";
import type { TimeSlot } from "@/data/booking";

/** Lädt die Zeit-Slots eines Tages (GET /api/availability) vom Worker. */
export function useAvailability(date: string) {
  // `loaded.date` merkt sich, zu welchem Datum `slots` gehören – so ist
  // "lädt" einfach der Unterschied zum gewählten Datum (kein setState im Effekt).
  const [loaded, setLoaded] = useState<{ date: string | null; slots: TimeSlot[] }>({
    date: null,
    slots: [],
  });
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!date) return;
    let cancelled = false;
    fetch(`/api/availability?date=${date}`)
      .then((res) => res.json() as Promise<{ slots?: TimeSlot[] }>)
      .then((data) => {
        if (!cancelled) setLoaded({ date, slots: data.slots ?? [] });
      })
      .catch(() => {
        if (!cancelled) setLoaded({ date, slots: [] });
      });
    return () => {
      cancelled = true;
    };
  }, [date, refreshKey]);

  return {
    slots: loaded.slots,
    loading: Boolean(date) && loaded.date !== date,
    reload: () => setRefreshKey((k) => k + 1),
  };
}
