import type { WorkLens } from "@/lib/portfolioLens";
import { parseWorkLensParam } from "@/lib/portfolioLens";

const KEY = "portfolioScoutReturnLens";

/** Call when opening Scout from the Work section so Back / history can restore the right tab. */
export function setScoutReturnLens(lens: WorkLens): void {
  try {
    sessionStorage.setItem(KEY, lens);
  } catch {
    /* quota / private mode */
  }
}

export function readScoutReturnLens(): WorkLens | null {
  if (typeof window === "undefined") return null;
  try {
    return parseWorkLensParam(sessionStorage.getItem(KEY));
  } catch {
    return null;
  }
}

export function clearScoutReturnLens(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
