import invariant from '@/lib/utils/invariant';

import { allTags } from './tags.constants';
import { Tag, TagType } from './tags.types';

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

export const isEqualTag = (a: Tag, b: Tag): boolean => {
  return a.type === b.type && a.name === b.name;
};

export async function getTagSuggestions(
  query: string,
  filters: Tag[] = [],
): Promise<Tag[]> {
  if (!query) return [];

  let hits = [] as Tag[];

  const a = query.toLowerCase();

  const tagsToSearch = tagUtils.list(allTags).exclude(filters);

  hits = tagsToSearch.filter((item) => {
    const name = item.name;
    const b = name.toLowerCase().slice(0, query.length);

    return a === b;
  });

  return hits;
}

export async function getTags(
  type?: TagType | undefined | null,
): Promise<Tag[]> {
  if (!type) return allTags;

  return allTags.filter((tag) => tag.type === type);
}
