const ACCENTS = ["var(--lime)", "var(--violet)", "var(--coral)", "var(--cyan)"] as const;

/** Cycles the original palette so neighbouring cards get different accents. */
export function accentFor(index: number): string {
  return ACCENTS[index % ACCENTS.length];
}
