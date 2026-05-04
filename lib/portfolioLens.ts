export type WorkLens = "product" | "research" | "shipped" | "ai-builds";

const WORK_LENS_LIST: WorkLens[] = ["product", "research", "shipped", "ai-builds"];

/** Valid lens query param for deep-linking back to the Work section from case studies (e.g. `/scout?lens=shipped`). */
export function parseWorkLensParam(value: string | null | undefined): WorkLens | null {
  if (!value) return null;
  return (WORK_LENS_LIST as string[]).includes(value) ? (value as WorkLens) : null;
}

/**
 * Which project ids appear for each Work filter (order preserved).
 * - product: SafeYelli, Scout, Notelify
 * - research: SafeYelli Research, Namma Metro
 * - shipped: Scout (Chrome extension, Web Store), Google Pay, SafeYelli (live product)
 * - ai-builds: Subtle (Signal UX / AI iteration assistant)
 */
const VISIBLE_IDS: Record<WorkLens, number[]> = {
  product: [1, 9, 3],
  research: [8, 7],
  shipped: [9, 5, 1],
  "ai-builds": [6],
};

export function lensProjectCount(lens: WorkLens): number {
  return VISIBLE_IDS[lens].length;
}

export function projectsForLens<T extends { id: number }>(list: T[], lens: WorkLens): T[] {
  const ids = VISIBLE_IDS[lens];
  const byId = new Map(list.map((p) => [p.id, p]));
  return ids.map((id) => byId.get(id)).filter((p): p is T => p !== undefined);
}
