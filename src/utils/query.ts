export function normalizeQueryParam<T extends string = string>(
  param: string | string[] | undefined,
): T {
  return param as T;
}
