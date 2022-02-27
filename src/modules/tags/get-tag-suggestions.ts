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
