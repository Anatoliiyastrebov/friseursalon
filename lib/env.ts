import { getCloudflareContext } from "@opennextjs/cloudflare";

/** Cloudflare Worker bindings & secrets (D1, ADMIN_PASSWORD, ...). */
export async function getEnv(): Promise<CloudflareEnv> {
  const { env } = await getCloudflareContext({ async: true });
  return env;
}
