import { capitalizeFirst } from '@/common/utils';

import { SEARCH_FILTERS } from './constants';
import { FilterCategory, Tag } from './types';

export function getPluralCategory(category: FilterCategory): string {
  if (category === 'cargo-dependency') return 'Cargo Dependencies';
  if (category === 'npm-dependency') return 'NPM Dependencies';
  return `${capitalizeFirst(category)}s`;
}

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
