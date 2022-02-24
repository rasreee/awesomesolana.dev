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

export type FilterType =
  | 'npm-dependency'
  | 'cargo-dependency'
  | 'topic'
  | 'language'
  | 'framework';

export type SearchFilter = {
  type: FilterType;
  name: string;
};

export const DEPENDENCY_FILTERS: SearchFilter[] = Object.entries(DEPENDENCIES)
  .map(([type, values]) =>
    values.map(
      (name) => ({ type: `${type}-dependency`, name } as SearchFilter),
    ),
  )
  .flat();

const TAG_FILTERS: SearchFilter[] = Object.entries(TAG_NAMES)
  .map(([type, values]) =>
    values.map((name) => ({ type, name: name.toLowerCase() } as SearchFilter)),
  )
  .flat();

export function toPluralFilterType(type: FilterType): string {
  if (type === 'cargo-dependency') return 'Cargo Dependencies';
  if (type === 'npm-dependency') return 'NPM Dependencies';
  return `${capitalizeFirst(type)}s`;
}

export const SEARCH_FILTERS: SearchFilter[] = [
  ...TAG_FILTERS,
  ...DEPENDENCY_FILTERS,
];

export function filtersByType(
  list: SearchFilter[],
  type: SearchFilter['type'],
): SearchFilter[] {
  return list.filter((filter) => filter.type === type);
}

export function sortFiltersByProjectCount(
  list: SearchFilter[],
): SearchFilter[] {
  return list.sort(
    (a, b) => getProjectsCountForTag(b) - getProjectsCountForTag(a),
  );
}

export function getFilterTypes(): FilterType[] {
  const result = [
    'topic',
    'framework',
    'language',
    'npm-dependency',
    'cargo-dependency',
  ] as FilterType[];
  return result;
}

export async function searchFilters(
  query: string,
  filter?: { type: FilterType },
): Promise<SearchFilter[]> {
  if (!query) return [];

  let hits = [] as SearchFilter[];

  const a = query.toLowerCase();

  const tagsToSearch = filter
    ? SEARCH_FILTERS.filter((tag) => tag.type === filter.type)
    : SEARCH_FILTERS;

  hits = tagsToSearch.filter((item) => {
    const name = item.name;
    const b = name.toLowerCase().slice(0, query.length);

    return a === b;
  });

  return hits;
}
