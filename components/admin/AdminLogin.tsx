"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { inputClass, labelClass } from "@/components/ui/fieldStyles";

export function AdminLogin({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        onSuccess();
        return;
      }
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      setError(data.error || "Anmeldung fehlgeschlagen.");
    } catch {
      setError("Keine Verbindung zum Server.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="luxury-gradient flex min-h-screen items-center justify-center px-5 py-10">
      <div className="glass w-full max-w-sm rounded-3xl p-8 text-center shadow-lg">
        <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-black/5">
          <Lock aria-hidden className="h-5 w-5 text-black" strokeWidth={1.5} />
        </div>
        <p className="font-serif text-2xl font-medium text-black">Mira</p>
        <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-warm-gray">
          Terminverwaltung
        </p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <div>
            <label htmlFor="admin-password" className={labelClass}>
              Passwort
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
              autoComplete="current-password"
              autoFocus
            />
            {error && <p className="mt-2 text-xs text-red-600">{error}</p>}
          </div>
          <Button type="submit" className="w-full" disabled={busy || !password}>
            {busy ? "Wird geprüft..." : "Anmelden"}
          </Button>
        </form>
        <Link href="/" className="mt-6 inline-block text-xs text-warm-gray transition-colors hover:text-black">
          ← Zurück zur Website
        </Link>
      </div>
    </div>
  );
}
