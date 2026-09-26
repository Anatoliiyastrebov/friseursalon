import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getEnv } from "@/lib/env";

export const ADMIN_COOKIE_NAME = "mira_admin_session";

function safeEqual(a: string, b: string): boolean {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);
  return bufferA.length === bufferB.length && timingSafeEqual(bufferA, bufferB);
}

export async function isAdminPassword(password: string): Promise<boolean> {
  const env = await getEnv();
  const expected = env.ADMIN_PASSWORD;
  if (!expected) {
    throw new Error("ADMIN_PASSWORD ist nicht gesetzt.");
  }
  return safeEqual(password, expected);
}

export async function createSessionToken(): Promise<string> {
  const env = await getEnv();
  const secret = env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET ist nicht gesetzt.");
  }
  return createHmac("sha256", secret).update("mira-admin-session").digest("hex");
}

export async function isValidSessionToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const expected = await createSessionToken();
  return safeEqual(token, expected);
}

/**
 * Checks the admin session cookie on the current request (Route Handlers only).
 * Fails closed (returns false) if ADMIN_SESSION_SECRET isn't configured yet,
 * instead of throwing and breaking the admin page's login detection.
 */
export async function isAdminRequest(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  try {
    return await isValidSessionToken(token);
  } catch {
    return false;
  }
}
