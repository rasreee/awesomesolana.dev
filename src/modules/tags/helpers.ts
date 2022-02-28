import invariant from '@/lib/utils/invariant';

import { allTags } from './constants';
import { isEqualTag } from './is-equal-tag';
import { Tag, TagType } from './types';

export const tagUtils = {
  list: (arr: Tag[]) => ({
    has: (target: Tag) => arr.some((item) => isEqualTag(item, target)),
    ofType: (type: TagType) => arr.filter((tag) => tag.type === type),
    exclude: (target: Tag[]): Tag[] =>
      arr.filter((item) => !tagUtils.list(target).has(item)),
    excludeFilters: (filters: string[]): Tag[] => {
      const tags = filters.map(toTag);

      return tags;
    },
  }),
};

export const toTag = (tagName: string): Tag => {
  const found = allTags.find((tag) => tag.name === tagName);
  invariant(found, `invalid tagName ${tagName} for toTag`);
  return found;
};
