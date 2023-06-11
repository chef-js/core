export function getParam(find: string, fallback: string): string {
  const matches: RegExpMatchArray | null = process.argv
    .join(" ")
    .match(new RegExp(`--${find} ([^ ]+)`));

  return matches ? matches[1] : fallback;
}
