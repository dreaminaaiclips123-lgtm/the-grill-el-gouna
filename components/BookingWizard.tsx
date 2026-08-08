"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  IconMinus,
  IconPlus,
  IconArrowLeft,
  IconLoader2,
  IconCircleCheck,
  IconCalendarEvent,
} from "@tabler/icons-react";

type Step = "intro" | "party" | "datetime" | "details" | "success";

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

const STEP_ORDER: Step[] = ["intro", "party", "datetime", "details", "success"];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? 24 : -24, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -24 : 24, opacity: 0 }),
};

export function BookingWizard() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>("intro");
  const [dir, setDir] = useState(1);

  const [partySize, setPartySize] = useState(2);
  const [date, setDate] = useState(todayISO());
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function go(next: Step, direction: number) {
    setDir(direction);
    setStep(next);
    setError(null);
  }

  async function submit() {
    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }
    if (phone.replace(/[^\d]/g, "").length < 8) {
      setError("Please enter a valid phone number.");
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          partySize,
          date,
          time,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error ?? "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      go("success", 1);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const stepIndex = STEP_ORDER.indexOf(step);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-line/60 bg-bg-raised/95 backdrop-blur-sm">
      <AnimatePresence mode="wait" custom={dir} initial={false}>
        <motion.div
          key={step}
          custom={dir}
          variants={reduce ? undefined : variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
          className="p-8 md:p-10"
        >
          {step === "intro" && (
            <div className="flex flex-col items-start gap-4">
              <IconCalendarEvent
                className="h-7 w-7 text-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="font-display text-2xl tracking-tight text-ink">
                Dine with us.
              </p>
              <p className="text-sm text-ink-muted">
                Book a table in under a minute. We confirm on WhatsApp.
              </p>
              <button
                type="button"
                onClick={() => go("party", 1)}
                className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98]"
              >
                Start booking
              </button>
            </div>
          )}

          {step === "party" && (
            <StepShell
              label="How many guests?"
              onBack={() => go("intro", -1)}
            >
              <div className="flex items-center justify-center gap-6 py-6">
                <IconButton
                  label="Fewer guests"
                  onClick={() => setPartySize((n) => Math.max(1, n - 1))}
                >
                  <IconMinus className="h-4 w-4" aria-hidden="true" />
                </IconButton>
                <span className="font-display text-5xl tabular-nums text-ink">
                  {partySize}
                </span>
                <IconButton
                  label="More guests"
                  onClick={() => setPartySize((n) => Math.min(20, n + 1))}
                >
                  <IconPlus className="h-4 w-4" aria-hidden="true" />
                </IconButton>
              </div>
              <NextButton onClick={() => go("datetime", 1)}>
                Continue
              </NextButton>
            </StepShell>
          )}

          {step === "datetime" && (
            <StepShell
              label="When?"
              onBack={() => go("party", -1)}
            >
              <div className="mt-5 flex flex-col gap-4">
                <input
                  type="date"
                  required
                  min={todayISO()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none [color-scheme:dark]"
                />
                <div className="flex flex-wrap gap-2">
                  {TIME_SLOTS.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setTime(slot)}
                      className={`rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                        time === slot
                          ? "bg-accent text-bg"
                          : "bg-bg text-ink-muted hover:text-ink"
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              <NextButton
                onClick={() => time && go("details", 1)}
                disabled={!time}
              >
                Continue
              </NextButton>
            </StepShell>
          )}

          {step === "details" && (
            <StepShell label="Who's booking?" onBack={() => go("datetime", -1)}>
              <div className="mt-5 flex flex-col gap-4">
                <LabeledInput
                  label="Name"
                  value={name}
                  onChange={setName}
                  placeholder="Full name"
                  autoComplete="name"
                />
                <LabeledInput
                  label="WhatsApp number"
                  value={phone}
                  onChange={setPhone}
                  placeholder="+20 1XX XXX XXXX"
                  type="tel"
                  autoComplete="tel"
                />
                <LabeledInput
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@example.com"
                  type="email"
                  autoComplete="email"
                />
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="wizard-notes" className="text-xs text-ink-faint">
                    Notes (optional)
                  </label>
                  <textarea
                    id="wizard-notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={2}
                    maxLength={500}
                    placeholder="Allergies, occasion, seating preference"
                    className="w-full resize-none rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
                  />
                </div>
              </div>

              {error ? (
                <p className="mt-4 text-sm text-accent" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98] disabled:opacity-60"
              >
                {submitting ? (
                  <IconLoader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : null}
                {submitting ? "Sending" : "Confirm booking"}
              </button>
              <p className="mt-4 text-xs text-ink-faint">
                Prefer to call?{" "}
                <a
                  href="tel:+201221785555"
                  className="underline decoration-line underline-offset-2 hover:text-ink-muted"
                >
                  +20 122 178 5555
                </a>
              </p>
            </StepShell>
          )}

          {step === "success" && (
            <div className="flex flex-col items-start gap-3">
              <IconCircleCheck
                className="h-8 w-8 text-accent"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <p className="font-display text-xl tracking-tight text-ink">
                Table requested for {partySize}, {date} at {time}.
              </p>
              <p className="text-sm text-ink-muted">
                We will confirm on WhatsApp shortly. If you do not hear back
                within an hour, call us at +20 122 178 5555.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {step !== "intro" && step !== "success" ? (
        <div className="flex justify-center gap-1.5 pb-6">
          {STEP_ORDER.slice(1, 4).map((s, i) => (
            <span
              key={s}
              className={`h-1 w-6 rounded-full transition-colors duration-200 ${
                i <= stepIndex - 1 ? "bg-accent" : "bg-line"
              }`}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function StepShell({
  label,
  onBack,
  children,
}: {
  label: string;
  onBack: () => void;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Back"
          className="flex h-7 w-7 items-center justify-center rounded-full text-ink-faint transition-colors duration-200 hover:text-ink"
        >
          <IconArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <p className="text-sm text-ink-faint">{label}</p>
      </div>
      {children}
    </div>
  );
}

function NextButton({
  onClick,
  disabled,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98] disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function IconButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink-muted active:scale-95"
    >
      {children}
    </button>
  );
}

function LabeledInput({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  autoComplete?: string;
}) {
  const id = `wizard-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-xs text-ink-faint">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        autoComplete={autoComplete}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint focus:border-accent focus:outline-none"
      />
    </div>
  );
}
