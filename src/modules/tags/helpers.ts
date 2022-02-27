import { isEqualTag } from './is-equal-tag';
import { Tag, TagType } from './types';

export const tagUtils = {
  list: (arr: Tag[]) => ({
    has: (target: Tag) => arr.some((item) => isEqualTag(item, target)),
    ofType: (type: TagType) => arr.filter((tag) => tag.type === type),
    exclude: (target: Tag[]): Tag[] =>
      arr.filter((item) => !tagUtils.list(target).has(item)),
  }),
};
