"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { DatePicker } from "@/components/ui/DatePicker";
import { Select } from "@/components/ui/Select";
import { services } from "@/data/services";
import { getBerlinToday, isSalonOpenOn } from "@/data/booking";
import { TimeSlotPicker } from "@/components/booking/TimeSlotPicker";
import { useAvailability } from "@/lib/useAvailability";
import type { BookingFormData } from "@/types";

const initialForm: BookingFormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
  time: "",
  message: "",
};

type FormErrors = Partial<Record<keyof BookingFormData, string>>;

function validate(data: BookingFormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Bitte geben Sie Ihren Namen ein.";
  if (!data.phone.trim()) errors.phone = "Bitte geben Sie Ihre Telefonnummer ein.";
  else if (!/^[\d\s+\-()]+$/.test(data.phone))
    errors.phone = "Ungültige Telefonnummer.";
  if (!data.email.trim()) errors.email = "Bitte geben Sie Ihre E-Mail ein.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email))
    errors.email = "Ungültige E-Mail-Adresse.";
  if (!data.service) errors.service = "Bitte wählen Sie eine Leistung.";
  if (!data.date) errors.date = "Bitte wählen Sie ein Wunschdatum.";
  if (!data.time) errors.time = "Bitte wählen Sie eine Uhrzeit.";
  return errors;
}

export function Booking() {
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const { slots: timeSlots, loading: slotsLoading, reload: reloadSlots } = useAvailability(form.date);

  const updateField = (name: keyof BookingFormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
      // Bei Datumswechsel muss die Uhrzeit neu gewählt werden, da sich
      // die verfügbaren Slots pro Tag unterscheiden.
      ...(name === "date" ? { time: "" } : {}),
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => updateField(e.target.name as keyof BookingFormData, e.target.value);

  const today = getBerlinToday();
  const isDateDisabled = (dateStr: string) => !isSalonOpenOn(dateStr);

  const handleSelectTime = (time: string) => {
    setForm((prev) => ({ ...prev, time }));
    if (errors.time) {
      setErrors((prev) => ({ ...prev, time: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
        setForm(initialForm);
      } else {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setErrors((prev) => ({
          ...prev,
          time: data.error || "Der Termin konnte nicht gebucht werden.",
        }));
        if (res.status === 409) {
          // Slot ist inzwischen belegt – Verfügbarkeit neu laden.
          setForm((prev) => ({ ...prev, time: "" }));
          reloadSlots();
        }
      }
    } catch {
      setErrors((prev) => ({
        ...prev,
        time: "Der Termin konnte nicht gebucht werden. Bitte versuchen Sie es erneut.",
      }));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-2xl border border-beige-dark/80 bg-white/80 px-5 py-3.5 text-sm text-black outline-none transition-all placeholder:text-warm-gray-light focus:border-black/20 focus:ring-2 focus:ring-soft-pink/50";

  return (
    <section id="booking" className="section-padding luxury-gradient">
      <div className="container-luxury">
        <SectionHeading
          label="Termin"
          title="Ihre Auszeit beginnt hier"
          description="Füllen Sie das Formular aus – wir melden uns innerhalb von 24 Stunden bei Ihnen zur Bestätigung."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass rounded-3xl p-12 text-center"
              >
                <CheckCircle className="mx-auto h-14 w-14 text-black" strokeWidth={1} />
                <h3 className="mt-6 font-serif text-2xl text-black">
                  Vielen Dank!
                </h3>
                <p className="mt-3 text-warm-gray">
                  Ihre Anfrage wurde erfolgreich übermittelt. Wir freuen uns,
                  Sie bald in unserem Salon begrüßen zu dürfen.
                </p>
                <Button
                  className="mt-8"
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                >
                  Weitere Anfrage senden
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="glass space-y-5 rounded-3xl p-8 md:p-10"
              >
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-gray">
                      Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Maria Schmidt"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="phone" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-gray">
                      Telefon *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="+49 170 123 4567"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-gray">
                    E-Mail *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="maria@beispiel.de"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="service" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-gray">
                      Leistung *
                    </label>
                    <Select
                      id="service"
                      value={form.service}
                      onChange={(value) => updateField("service", value)}
                      placeholder="Bitte wählen"
                      invalid={Boolean(errors.service)}
                      options={services.map((s) => ({
                        value: s.name,
                        label: s.name,
                        hint: [s.price, s.duration].filter(Boolean).join(" · "),
                      }))}
                    />
                    {errors.service && (
                      <p className="mt-1 text-xs text-red-600">{errors.service}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="date" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-gray">
                      Wunschdatum *
                    </label>
                    <DatePicker
                      id="date"
                      value={form.date}
                      onChange={(value) => updateField("date", value)}
                      today={today}
                      isDateDisabled={isDateDisabled}
                      placeholder="Datum wählen"
                      invalid={Boolean(errors.date)}
                    />
                    {errors.date && (
                      <p className="mt-1 text-xs text-red-600">{errors.date}</p>
                    )}
                  </div>
                </div>

                {form.date && (
                  <TimeSlotPicker
                    slots={timeSlots}
                    loading={slotsLoading}
                    value={form.time}
                    onSelect={handleSelectTime}
                    error={errors.time}
                  />
                )}

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-gray">
                    Nachricht
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={form.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="Besondere Wünsche oder Fragen..."
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? "Wird gesendet..." : "Anfrage absenden"}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
