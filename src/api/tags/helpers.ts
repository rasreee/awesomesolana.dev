import { SEARCH_FILTERS } from './constants';
import { FilterCategory, Tag } from './types';

export async function getTagSuggestions(
  query: string,
  filter?: { category: FilterCategory },
): Promise<Tag[]> {
  if (!query) return [];

  let hits = [] as Tag[];

  const a = query.toLowerCase();

  const tagsToSearch = filter
    ? SEARCH_FILTERS.filter((tag) => tag.category === filter.category)
    : SEARCH_FILTERS;

  hits = tagsToSearch.filter((item) => {
    const name = item.name;
    const b = name.toLowerCase().slice(0, query.length);

    return a === b;
  });

  return hits;
}
