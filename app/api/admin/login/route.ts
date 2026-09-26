import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, createSessionToken, isAdminPassword } from "@/lib/adminAuth";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { password?: string } | null;

  let passwordValid: boolean;
  let sessionToken: string;
  try {
    passwordValid = Boolean(body?.password) && (await isAdminPassword(body!.password!));
    sessionToken = await createSessionToken();
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Serverkonfiguration fehlt." },
      { status: 500 }
    );
  }

  if (!passwordValid) {
    return NextResponse.json({ error: "Falsches Passwort." }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ ok: true });
}
