import { capitalizeFirst } from '@/common/utils';

import { DEPENDENCIES } from './dependencies';
import { getProjectsCountForTag } from './projects';

const TAG_NAMES = {
  language: [
    'Rust',
    'JavaScript',
    'Typescript',
    'C',
    'Golang',
    'Python',
    'Java',
    'Swift',
    'CLI',
    'Kotlin',
  ],
  framework: ['Anchor', 'Web3.js', 'React.js', 'Svelte', 'Vue.js', 'Next.js'],
  topic: [
    'associated-token-account',
    'program-derived-address',
    'decentralized-identity',
    'did',
    'spl-token',
    'wallet',
    'nft',
    'solana-name-service',
    'staking',
    'lending',
    'program-deployment',
    'dao',
    'exchange',
    'game',
    'token-program',
    'system-program',
    'rent',
    'transaction',
    'token-swap-program',
    'token-program',
    'automated-market-marker',
    'amm',
    'cross-program-invocations',
    'program-signed-accounts',
  ],
};

export type FilterCategory =
  | 'npm-dependency'
  | 'cargo-dependency'
  | 'topic'
  | 'language'
  | 'framework';

export type SearchFilter = {
  category: FilterCategory;
  name: string;
};

export const DEPENDENCY_FILTERS: SearchFilter[] = Object.entries(DEPENDENCIES)
  .map(([category, values]) =>
    values.map(
      (name) => ({ category: `${category}-dependency`, name } as SearchFilter),
    ),
  )
  .flat();

const TAG_FILTERS: SearchFilter[] = Object.entries(TAG_NAMES)
  .map(([category, values]) =>
    values.map(
      (name) => ({ category, name: name.toLowerCase() } as SearchFilter),
    ),
  )
  .flat();

export function toPluralFilterCategory(category: FilterCategory): string {
  if (category === 'cargo-dependency') return 'Cargo Dependencies';
  if (category === 'npm-dependency') return 'NPM Dependencies';
  return `${capitalizeFirst(category)}s`;
}

export const SEARCH_FILTERS: SearchFilter[] = [
  ...TAG_FILTERS,
  ...DEPENDENCY_FILTERS,
];

export function filtersByType(
  list: SearchFilter[],
  category: SearchFilter['category'],
): SearchFilter[] {
  return list.filter((filter) => filter.category === category);
}

export function sortFiltersByProjectCount(
  list: SearchFilter[],
): SearchFilter[] {
  return list.sort(
    (a, b) => getProjectsCountForTag(b) - getProjectsCountForTag(a),
  );
}

export function getFilterCategorys(): FilterCategory[] {
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
): Promise<SearchFilter[]> {
  if (!query) return [];

  let hits = [] as SearchFilter[];

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
