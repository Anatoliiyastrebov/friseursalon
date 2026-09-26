import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { isAdminRequest } from "@/lib/adminAuth";
import { BOOKING_STATUSES, type BookingStatus } from "@/lib/bookings";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const { id } = await params;

  let db;
  try {
    db = await getDb();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Serverkonfiguration fehlt." },
      { status: 500 }
    );
  }

  await db.prepare("DELETE FROM bookings WHERE id = ?1").bind(id).run();

  return NextResponse.json({ ok: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { status?: string } | null;
  if (!body?.status || !BOOKING_STATUSES.includes(body.status as BookingStatus)) {
    return NextResponse.json({ error: "Ungültiger Status." }, { status: 400 });
  }

  const { id } = await params;

  let db;
  try {
    db = await getDb();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Serverkonfiguration fehlt." },
      { status: 500 }
    );
  }

  const result = await db
    .prepare("UPDATE bookings SET status = ?1 WHERE id = ?2")
    .bind(body.status, id)
    .run();

  if (!result.meta.changes) {
    return NextResponse.json({ error: "Termin nicht gefunden." }, { status: 404 });
  }
  return NextResponse.json({ ok: true });
}
