import { Tag } from '@awesomesolana/common';

export interface SearchQueryArgs {
  term?: string;
  tags?: Tag[];
  page?: number;
  per_page?: number;
}

export type SearchQuery = {
  language?: string;
  topic?: string;
  framework?: string;
  dependency?: string;
  term: string;
  page: number;
  per_page: number;
};

export function searchQuery({
  tags = [],
  term = '',
  page = 0,
  per_page = 10,
}: SearchQueryArgs): SearchQuery {
  const queryEntries: [string, string][] = tags.map((tag) => [
    tag.type,
    tag.name,
  ]);

  if (term) {
    queryEntries.push(['term', term]);
  }

  const query = Object.fromEntries(queryEntries);

  return { ...query, page, per_page: per_page } as SearchQuery;
}
