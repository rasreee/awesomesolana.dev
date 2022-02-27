import { Tag } from './types';

export const isEqualTag = (a: Tag, b: Tag): boolean => {
  return a.type === b.type && a.name === b.name;
};
