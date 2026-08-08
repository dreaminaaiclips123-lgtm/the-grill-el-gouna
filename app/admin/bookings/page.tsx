import { listBookings } from "@/lib/db";
import { login, isAuthed } from "./actions";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const authed = await isAuthed();
  const { error } = await searchParams;

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-bg px-6">
        <form
          action={login}
          className="w-full max-w-sm rounded-2xl bg-bg-raised p-8"
        >
          <h1 className="font-display text-xl tracking-tight text-ink">
            Admin
          </h1>
          <label htmlFor="password" className="mt-6 block text-xs text-ink-faint">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="mt-1.5 w-full rounded-lg border border-line bg-bg px-3.5 py-2.5 text-sm text-ink focus:border-accent focus:outline-none"
          />
          {error ? (
            <p className="mt-3 text-sm text-accent">Wrong password.</p>
          ) : null}
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-accent px-6 py-2.5 text-sm font-medium text-bg transition-transform duration-200 ease-out hover:-translate-y-px active:scale-[0.98]"
          >
            Sign in
          </button>
        </form>
      </main>
    );
  }

  let bookings: Awaited<ReturnType<typeof listBookings>> = [];
  let dbError: string | null = null;
  try {
    bookings = await listBookings();
  } catch (err) {
    dbError = err instanceof Error ? err.message : "Unknown database error.";
  }

  return (
    <main className="min-h-screen bg-bg px-6 py-16">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-3xl tracking-tight text-ink">
          Bookings
        </h1>

        {dbError ? (
          <p className="mt-6 max-w-xl text-sm text-accent">
            Could not load bookings: {dbError}
          </p>
        ) : bookings.length === 0 ? (
          <p className="mt-6 text-sm text-ink-muted">No bookings yet.</p>
        ) : (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-line text-left text-xs text-ink-faint">
                  <th className="pb-3 pr-4 font-normal">Date</th>
                  <th className="pb-3 pr-4 font-normal">Time</th>
                  <th className="pb-3 pr-4 font-normal">Name</th>
                  <th className="pb-3 pr-4 font-normal">Party</th>
                  <th className="pb-3 pr-4 font-normal">Phone</th>
                  <th className="pb-3 pr-4 font-normal">Email</th>
                  <th className="pb-3 font-normal">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="text-ink">
                    <td className="py-3 pr-4">{booking.booking_date}</td>
                    <td className="py-3 pr-4">{booking.booking_time}</td>
                    <td className="py-3 pr-4">{booking.name}</td>
                    <td className="py-3 pr-4">{booking.party_size}</td>
                    <td className="py-3 pr-4">{booking.phone}</td>
                    <td className="py-3 pr-4">{booking.email}</td>
                    <td className="py-3 text-ink-muted">{booking.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
