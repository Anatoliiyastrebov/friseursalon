import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAdminRequest } from "@/lib/adminAuth";
import { handleCreateBooking } from "@/lib/bookings";

export function POST(request: Request) {
  return handleCreateBooking(request, { source: "online", requireContact: true });
}

export async function GET() {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
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
    .prepare("SELECT * FROM bookings ORDER BY date ASC, time ASC")
    .all();

  return NextResponse.json({ bookings: results });
}
