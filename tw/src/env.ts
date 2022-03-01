export function isBrowser() {
  return (
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    typeof document !== "undefined"
  );
}
