import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { computeSlotsForDate } from "@/data/booking";

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get("date");
  if (!date) {
    return NextResponse.json({ error: "Datum fehlt." }, { status: 400 });
  }

  let db;
  try {
    db = await getDb();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Serverkonfiguration fehlt." },
      { status: 500 }
    );
  }

  const { results } = await db
    .prepare("SELECT time FROM bookings WHERE date = ?1 AND status != 'storniert'")
    .bind(date)
    .all<{ time: string }>();

  const bookedTimes = results.map((row) => row.time);
  const slots = computeSlotsForDate(date, bookedTimes);

  return NextResponse.json({ slots });
}
