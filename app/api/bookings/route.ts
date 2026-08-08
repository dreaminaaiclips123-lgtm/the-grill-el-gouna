import { NextResponse } from "next/server";
import { createBooking } from "@/lib/db";
import { sendBookingConfirmation, notifyRestaurantOfBooking } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime());
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const {
    name,
    email,
    phone,
    partySize,
    date,
    time,
    notes,
  } = (body ?? {}) as Record<string, unknown>;

  if (typeof name !== "string" || name.trim().length < 2) {
    return NextResponse.json({ error: "Please enter your name." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }
  if (typeof phone !== "string" || phone.replace(/[^\d]/g, "").length < 8) {
    return NextResponse.json({ error: "Please enter a valid phone number." }, { status: 400 });
  }
  const partySizeNum = Number(partySize);
  if (!Number.isInteger(partySizeNum) || partySizeNum < 1 || partySizeNum > 20) {
    return NextResponse.json({ error: "Party size must be between 1 and 20." }, { status: 400 });
  }
  if (typeof date !== "string" || !isValidDate(date)) {
    return NextResponse.json({ error: "Please choose a valid date." }, { status: 400 });
  }
  if (typeof time !== "string" || !/^\d{2}:\d{2}$/.test(time)) {
    return NextResponse.json({ error: "Please choose a valid time." }, { status: 400 });
  }

  let booking;
  try {
    booking = await createBooking({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      partySize: partySizeNum,
      date,
      time,
      notes: typeof notes === "string" ? notes.trim().slice(0, 500) : undefined,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown database error.";
    return NextResponse.json(
      {
        error:
          "Booking could not be saved. The restaurant's database is not connected yet.",
        detail: message,
      },
      { status: 503 }
    );
  }

  const [confirmResult, notifyResult] = await Promise.all([
    sendBookingConfirmation({
      toPhone: booking.phone,
      name: booking.name,
      date: booking.booking_date,
      time: booking.booking_time,
      partySize: booking.party_size,
    }),
    notifyRestaurantOfBooking({
      name: booking.name,
      phone: booking.phone,
      date: booking.booking_date,
      time: booking.booking_time,
      partySize: booking.party_size,
    }),
  ]);

  return NextResponse.json({
    booking,
    whatsapp: {
      customerConfirmationSent: confirmResult.sent,
      restaurantNotified: notifyResult.sent,
    },
  });
}
