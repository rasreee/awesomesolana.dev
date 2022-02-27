type Dict = Record<string, string | number>;

export const groupBy = <T extends Dict = Dict, Key extends keyof T = keyof T>(
  list: T[],
  key: Key,
): Record<T[Key], T[]> => {
  const props = getPossibleValuesSet(list, key);

  const result = {} as Record<T[Key], T[]>;

  props.forEach((prop) => {
    const value = list.filter((item) => item[key] === prop);

    result[prop] = value;
  });

  return result;
};

export const getPossibleValuesSet = <T extends Dict, Key extends keyof T>(
  list: T[],
  key: Key,
) => {
  const props: Array<T[Key]> = [];

  list.forEach((item) => {
    if (props.includes(item[key])) return;

    props.push(item[key]);
  });

  return props;
};
