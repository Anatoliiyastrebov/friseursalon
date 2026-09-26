import { getEnv } from "@/lib/env";

/** D1-Datenbank-Binding ("DB" in wrangler.jsonc), ersetzt den alten Supabase-Client. */
export async function getDb(): Promise<D1Database> {
  const env = await getEnv();
  if (!env.DB) {
    throw new Error(
      'D1-Datenbank ist nicht konfiguriert (Binding "DB" fehlt in wrangler.jsonc).'
    );
  }
  return env.DB;
}
