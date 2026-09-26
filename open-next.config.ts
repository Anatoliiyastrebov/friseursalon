import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Statische Marketing-Seite ohne ISR/On-Demand-Revalidation – der Standard
// "dummy" Cache reicht aus, keine R2/KV-Bindings nötig.
export default defineCloudflareConfig();
