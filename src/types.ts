export type BuildInfo = {
  timestampIso: string;
  epochMs: number;
  timezone: string;
  ci?: {
    name: string;
    buildId?: string;
    commit?: string;
    branch?: string;
  };
  custom?: Record<string, string>;
};