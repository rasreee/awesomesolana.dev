import { allTags } from './constants';
import { Tag, TagType } from './types';

export async function getTagSuggestions(
  query: string,
  filter?: { type?: TagType },
): Promise<Tag[]> {
  if (!query) return [];

  let hits = [] as Tag[];

  const a = query.toLowerCase();

  const tagsToSearch = filter?.type
    ? allTags.filter((tag) => tag.type === filter.type)
    : allTags;

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

export const isEqualTag = (a: Tag, b: Tag): boolean => {
  return a.type === b.type && a.name === b.name;
};

export const tags = {
  list: (arr: Tag[]) => ({
    has: (target: Tag) => arr.some((item) => isEqualTag(item, target)),
    ofType: (type: TagType) => arr.filter((tag) => tag.type === type),
    exclude: (target: Tag[]): Tag[] =>
      arr.filter((item) => !tags.list(target).has(item)),
  }),
};
