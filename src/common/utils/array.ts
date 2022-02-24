export function getIntersection<T extends {} = {}>(
  a: T[],
  b: T[],
  comparer: (a: T, b: T) => boolean,
): T[] {
  const result: T[] = [];

  a.forEach((aItem) => {
    if (b.some((bItem) => comparer(aItem, bItem))) {
      result.push(aItem);
    }
  });

  return result;
}

export function uniques<T = any>(list: T[]): T[] {
  return [...new Set<T>(list).values()];
}
