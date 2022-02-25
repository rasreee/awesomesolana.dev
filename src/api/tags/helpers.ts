import { getProjectsCountForTag } from '@/api/projects';
import { capitalizeFirst } from '@/common/utils';

import { SEARCH_FILTERS } from './constants';
import { FilterCategory, Tag } from './types';

export function toPluralFilterCategory(category: FilterCategory): string {
  if (category === 'cargo-dependency') return 'Cargo Dependencies';
  if (category === 'npm-dependency') return 'NPM Dependencies';
  return `${capitalizeFirst(category)}s`;
}

export function filtersByType(list: Tag[], category: Tag['category']): Tag[] {
  return list.filter((filter) => filter.category === category);
}

export function sortFiltersByProjectCount(list: Tag[]): Tag[] {
  return list.sort(
    (a, b) => getProjectsCountForTag(b) - getProjectsCountForTag(a),
  );
}

export function getFilterCategories(): FilterCategory[] {
  const result = [
    'topic',
    'framework',
    'language',
    'npm-dependency',
    'cargo-dependency',
  ] as FilterCategory[];
  return result;
}

export async function searchFilters(
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
