import fs from "node:fs";
import path from "node:path";
import { detectCIEnv } from "./env.js";
import type { BuildInfo } from "./types.js";

const args = process.argv.slice(2);
const out = args[0] || "build-info.json";

const now = new Date();
const info: BuildInfo = {
  timestampIso: now.toISOString(),
  epochMs: now.getTime(),
  timezone: Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC",
  ci: detectCIEnv(process.env),
};

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(info, null, 2));

console.log(`[build-logger] Wrote ${out} at ${info.timestampIso}`);
