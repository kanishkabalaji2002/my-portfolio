export const JOKES = [
  "Or tea. I’m not picky about the leaf.",
  "Bonus points if you have a good ramen rec.",
  "Fair warning: I might sketch on a napkin mid-conversation.",
  "I promise the agenda is just: good conversation.",
  "If matcha’s not your thing, coffee works too.",
] as const;

export function pickRandomJoke(): string {
  const i = Math.floor(Math.random() * JOKES.length);
  return JOKES[i] ?? JOKES[0];
}
