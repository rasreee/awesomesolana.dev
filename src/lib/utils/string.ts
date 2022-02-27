export function capitalize(s: string): string {
  if (!s) return s;
  const first = s.charAt(0).toUpperCase();
  const rest = s.length > 1 ? s.substring(1) : '';

  return `${first}${rest}`;
}
