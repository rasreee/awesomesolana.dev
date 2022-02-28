import { allTags } from './constants';
import { tagUtils } from './helpers';
import { Tag } from './types';

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
