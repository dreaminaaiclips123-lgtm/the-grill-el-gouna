"use client";

import { useState, type FormEvent } from "react";
import { IconLoader2, IconCircleCheck } from "@tabler/icons-react";

type Status = "idle" | "submitting" | "success" | "error";

const TIME_SLOTS = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30",
  "23:00",
];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = new FormData(event.currentTarget);
    const payload = {
      name: form.get("name"),
      email: form.get("email"),
      phone: form.get("phone"),
      partySize: Number(form.get("partySize")),
      date: form.get("date"),
      time: form.get("time"),
      notes: form.get("notes"),
    };

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus("error");
        setErrorMessage(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Could not reach the server. Please try again.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl bg-bg-raised p-8 md:p-10">
        <IconCircleCheck
          className="h-8 w-8 text-accent"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <p className="font-display text-xl tracking-tight text-ink">
          Booking request received.
        </p>
        <p className="text-sm text-ink-muted">
          We will confirm your table on WhatsApp shortly. If you do not hear
          back within an hour, call us at +20 122 178 5555.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="rounded-2xl bg-bg-raised p-8 md:p-10"
      noValidate
    >
      <p className="text-sm text-ink-faint">Request a table</p>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor="name">
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            placeholder="Full name"
          />
        </Field>

        <Field label="Email" htmlFor="email">
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            placeholder="you@example.com"
          />
        </Field>

        <Field label="WhatsApp number" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
            placeholder="+20 1XX XXX XXXX"
          />
        </Field>

        <Field label="Party size" htmlFor="partySize">
          <input
            id="partySize"
            name="partySize"
            type="number"
            required
            min={1}
            max={20}
            defaultValue={2}
            className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
          />
        </Field>

        <Field label="Date" htmlFor="date">
          <input
            id="date"
            name="date"
            type="date"
            required
            min={todayISO()}
            className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none [color-scheme:dark]"
          />
        </Field>

        <Field label="Time" htmlFor="time">
          <select
            id="time"
            name="time"
            required
            defaultValue=""
            className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
          >
            <option value="" disabled>
              Choose a time
            </option>
            {TIME_SLOTS.map((slot) => (
              <option key={slot} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </Field>

        <div className="sm:col-span-2">
          <Field label="Notes (optional)" htmlFor="notes">
            <textarea
              id="notes"
              name="notes"
              rows={3}
              maxLength={500}
              className="w-full resize-none rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
              placeholder="Allergies, occasion, seating preference"
            />
          </Field>
        </div>
      </div>

      {status === "error" && errorMessage ? (
        <p className="mt-4 text-sm text-accent" role="alert">
          {errorMessage}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98] disabled:opacity-60 sm:w-auto"
      >
        {status === "submitting" ? (
          <IconLoader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : null}
        {status === "submitting" ? "Sending" : "Request booking"}
      </button>

      <p className="mt-4 text-xs text-ink-faint">
        Prefer to call?{" "}
        <a href="tel:+201221785555" className="underline decoration-line underline-offset-2 hover:text-ink-muted">
          +20 122 178 5555
        </a>{" "}
        or{" "}
        <a
          href="https://wa.me/201221783333"
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-line underline-offset-2 hover:text-ink-muted"
        >
          WhatsApp us
        </a>
        .
      </p>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-xs text-ink-faint">
        {label}
      </label>
      {children}
    </div>
  );
}
