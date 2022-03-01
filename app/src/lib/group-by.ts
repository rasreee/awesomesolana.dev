type Dict = Record<string, any>;

export type GroupBy<T extends Dict, Key extends keyof T> = Record<T[Key], T[]>;

export const groupBy = <T extends Dict, Key extends keyof T>(
  list: T[],
  key: Key,
): GroupBy<T, Key> => {
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
