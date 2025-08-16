import type { BuildInfo } from "./types.js";

let cached: BuildInfo | null = null;

function isBrowser() {
  return typeof window !== "undefined";
}

export async function getBuildInfo(src: string = "/build-info.json"): Promise<BuildInfo> {
  if (cached) return cached;

  if (isBrowser()) {
    const res = await fetch(src, { cache: "no-store" });
    cached = await res.json();
  } else {
    const fs = await import("node:fs/promises");
    const buf = await fs.readFile(src, "utf8");
    cached = JSON.parse(buf);
  }
  return cached!;
}

function formatDate(iso: string): string {
  const d = new Date(iso);

  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();

  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  const ss = String(d.getSeconds()).padStart(2, "0");

  return `${dd}.${mm}.${yyyy} ${hh}:${min}:${ss}`;
}

export async function logBuildInfo(src?: string) {
  const info: BuildInfo = await getBuildInfo(src);

  console.log("\n📦 Build Info\n");

  const table: Record<string, string> = {
    "Timestamp": formatDate(info.timestampIso),
    "Epoch (ms)": info.epochMs.toString(),
    "Timezone": info.timezone,
    "CI/CD": info.ci?.name ?? "local",
    "Build ID": info.ci?.buildId ?? "-",
    "Commit": info.ci?.commit ?? "-",
    "Branch": info.ci?.branch ?? "-",
  };

  // merge custom fields if present
  if (info.custom) {
    for (const [key, value] of Object.entries(info.custom)) {
      table[`Custom: ${key}`] = value;
    }
  }

  console.table(table);
}

