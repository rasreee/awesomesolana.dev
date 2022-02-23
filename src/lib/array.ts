export function getIntersection<T extends {} = {}>(
  a: T[],
  b: T[],
  getId: (item: T) => string,
): T[] {
  const result: T[] = [];
  const bIds = b.map(getId);

  a.forEach((item) => {
    if (bIds.includes(getId(item))) {
      result.push(item);
    }
  });

  return result;
}
