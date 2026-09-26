"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Modal } from "@/components/ui/Modal";
import { Select } from "@/components/ui/Select";
import { inputClass, labelClass } from "@/components/ui/fieldStyles";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import { getBerlinToday, isSalonOpenOn } from "@/data/booking";
import { services } from "@/data/services";
import { useAvailability } from "@/lib/useAvailability";
import type { AdminBooking } from "@/types";

interface Fields {
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email: string;
  message: string;
}

const emptyFields: Fields = {
  service: "",
  date: "",
  time: "",
  name: "",
  phone: "",
  email: "",
  message: "",
};

type FieldErrors = Partial<Record<keyof Fields, string>>;

const serviceOptions = services.map((s) => ({
  value: s.name,
  label: s.name,
  hint: [s.price, s.duration].filter(Boolean).join(" · "),
}));

function NewBookingForm({
  onCancel,
  onCreated,
}: {
  onCancel: () => void;
  onCreated: (booking: AdminBooking) => void;
}) {
  const [fields, setFields] = useState<Fields>(emptyFields);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [saving, setSaving] = useState(false);
  const { slots, loading: slotsLoading, reload } = useAvailability(fields.date);
  const today = getBerlinToday();

  const update = (name: keyof Fields, value: string) => {
    setFields((prev) => ({ ...prev, [name]: value, ...(name === "date" ? { time: "" } : {}) }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const found: FieldErrors = {};
    if (fields.name.trim().length < 2) found.name = "Bitte einen Namen eingeben.";
    if (!fields.service) found.service = "Bitte eine Leistung wählen.";
    if (!fields.date) found.date = "Bitte ein Datum wählen.";
    else if (!fields.time) found.time = "Bitte eine Uhrzeit wählen.";
    if (Object.keys(found).length > 0) {
      setErrors(found);
      return;
    }

    setSaving(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fields),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string; booking?: AdminBooking };
      if (res.ok && data.booking) {
        onCreated(data.booking);
        return;
      }
      if (res.status === 409) {
        setFields((prev) => ({ ...prev, time: "" }));
        setErrors({ time: data.error });
        reload();
      } else {
        setSubmitError(data.error || "Der Termin konnte nicht gespeichert werden.");
      }
    } catch {
      setSubmitError("Der Termin konnte nicht gespeichert werden. Bitte erneut versuchen.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="new-service" className={labelClass}>
            Leistung *
          </label>
          <Select
            id="new-service"
            value={fields.service}
            onChange={(v) => update("service", v)}
            options={serviceOptions}
            placeholder="Bitte wählen"
            invalid={Boolean(errors.service)}
          />
          {errors.service && <p className="mt-1 text-xs text-red-600">{errors.service}</p>}
        </div>
        <div>
          <label htmlFor="new-date" className={labelClass}>
            Datum *
          </label>
          <DatePicker
            id="new-date"
            value={fields.date}
            onChange={(v) => update("date", v)}
            today={today}
            isDateDisabled={(d) => !isSalonOpenOn(d)}
            placeholder="Datum wählen"
            invalid={Boolean(errors.date)}
          />
          {errors.date && <p className="mt-1 text-xs text-red-600">{errors.date}</p>}
        </div>
      </div>

      {fields.date && (
        <TimeSlotPicker
          slots={slots}
          loading={slotsLoading}
          value={fields.time}
          onSelect={(t) => update("time", t)}
          error={errors.time}
        />
      )}

      <div>
        <label htmlFor="new-name" className={labelClass}>
          Name *
        </label>
        <input
          id="new-name"
          value={fields.name}
          onChange={(e) => update("name", e.target.value)}
          className={inputClass}
          placeholder="Maria Schmidt"
          autoComplete="off"
        />
        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="new-phone" className={labelClass}>
            Telefon
          </label>
          <input
            id="new-phone"
            type="tel"
            value={fields.phone}
            onChange={(e) => update("phone", e.target.value)}
            className={inputClass}
            placeholder="+49 170 123 4567"
            autoComplete="off"
          />
        </div>
        <div>
          <label htmlFor="new-email" className={labelClass}>
            E-Mail
          </label>
          <input
            id="new-email"
            type="email"
            value={fields.email}
            onChange={(e) => update("email", e.target.value)}
            className={inputClass}
            placeholder="optional"
            autoComplete="off"
          />
        </div>
      </div>

      <div>
        <label htmlFor="new-message" className={labelClass}>
          Notiz
        </label>
        <textarea
          id="new-message"
          rows={3}
          value={fields.message}
          onChange={(e) => update("message", e.target.value)}
          className={`${inputClass} resize-none`}
          placeholder="z. B. Wunsch der Kundin, Rückruf vereinbart ..."
        />
      </div>

      {submitError && <p className="text-sm text-red-600">{submitError}</p>}

      <div className="flex justify-end gap-3 pt-1">
        <Button variant="outline" size="sm" onClick={onCancel} disabled={saving}>
          Abbrechen
        </Button>
        <Button type="submit" size="sm" disabled={saving}>
          {saving ? "Wird gespeichert..." : "Termin speichern"}
        </Button>
      </div>
    </form>
  );
}

export function NewBookingDialog({
  open,
  onClose,
  onCreated,
}: {
  open: boolean;
  onClose: () => void;
  onCreated: (booking: AdminBooking) => void;
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Neuer Termin"
      description="Telefonische oder persönliche Buchung eintragen."
    >
      <NewBookingForm onCancel={onClose} onCreated={onCreated} />
    </Modal>
  );
}
