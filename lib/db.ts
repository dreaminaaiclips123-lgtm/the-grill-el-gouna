import { neon } from "@neondatabase/serverless";

export type Booking = {
  id: number;
  name: string;
  email: string;
  phone: string;
  party_size: number;
  booking_date: string;
  booking_time: string;
  notes: string | null;
  status: string;
  created_at: string;
};

function getSql() {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!url) {
    throw new Error(
      "No database connection string found. Set DATABASE_URL (or POSTGRES_URL) once Postgres is connected to this project."
    );
  }
  return neon(url);
}

export async function ensureSchema() {
  const sql = getSql();
  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      party_size INTEGER NOT NULL,
      booking_date DATE NOT NULL,
      booking_time TEXT NOT NULL,
      notes TEXT,
      status TEXT NOT NULL DEFAULT 'pending',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;
}

export async function createBooking(input: {
  name: string;
  email: string;
  phone: string;
  partySize: number;
  date: string;
  time: string;
  notes?: string;
}): Promise<Booking> {
  const sql = getSql();
  await ensureSchema();
  const rows = await sql`
    INSERT INTO bookings (name, email, phone, party_size, booking_date, booking_time, notes)
    VALUES (${input.name}, ${input.email}, ${input.phone}, ${input.partySize}, ${input.date}, ${input.time}, ${input.notes ?? null})
    RETURNING *
  `;
  return rows[0] as Booking;
}

export async function listBookings(): Promise<Booking[]> {
  const sql = getSql();
  await ensureSchema();
  const rows = await sql`
    SELECT * FROM bookings
    ORDER BY booking_date ASC, booking_time ASC
  `;
  return rows as Booking[];
}
