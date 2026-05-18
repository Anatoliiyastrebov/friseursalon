"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import type { BookingFormData } from "@/types";

const initialForm: BookingFormData = {
  name: "",
  phone: "",
  email: "",
  service: "",
  date: "",
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
  return errors;
}

export function Booking() {
  const [form, setForm] = useState<BookingFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof BookingFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
    setForm(initialForm);
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
                    <select
                      id="service"
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className={inputClass}
                    >
                      <option value="">Bitte wählen</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                    {errors.service && (
                      <p className="mt-1 text-xs text-red-600">{errors.service}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="date" className="mb-2 block text-xs font-medium uppercase tracking-wider text-warm-gray">
                      Wunschdatum *
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={form.date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className={inputClass}
                    />
                    {errors.date && (
                      <p className="mt-1 text-xs text-red-600">{errors.date}</p>
                    )}
                  </div>
                </div>

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
