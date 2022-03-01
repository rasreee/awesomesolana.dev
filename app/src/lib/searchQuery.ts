import { Tag } from '@awesomesolana/common';

export interface SearchQueryArgs {
  term?: string;
  tags?: Tag[];
}

export type SearchQuery = {
  language?: string;
  topic?: string;
  framework?: string;
  dependency?: string;
  term: string;
};

export function searchQuery({
  tags = [],
  term = '',
}: SearchQueryArgs): SearchQuery {
  const queryEntries: [string, string][] = tags.map((tag) => [
    tag.type,
    tag.name,
  ]);

  if (term) {
    queryEntries.push(['term', term]);
  }

  const query = Object.fromEntries(queryEntries);

  return query as SearchQuery;
}
