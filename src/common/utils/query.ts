export function normalizeQueryParam(
  param: string | string[] | undefined,
): string {
  return param ? (param as string) : '';
}
