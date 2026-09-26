import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/adminAuth";
import { handleCreateBooking } from "@/lib/bookings";

/** Manuelle Buchung durch den Salon (z. B. Anruf): nur mit Admin-Session. */
export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Nicht autorisiert." }, { status: 401 });
  }
  return handleCreateBooking(request, { source: "telefon", requireContact: false });
}
