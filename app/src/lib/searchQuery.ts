import { ParsedUrlQuery } from 'querystring';

import { Tag } from '@/domains/tags/types';

export interface SearchQueryArgs {
  term?: string;
  tags?: Tag[];
}

export function searchQuery({
  tags = [],
  term = '',
}: SearchQueryArgs): ParsedUrlQuery {
  const queryEntries: [string, string][] = tags.map((tag) => [
    tag.type,
    tag.name,
  ]);

  if (term) {
    queryEntries.push(['term', term]);
  }

  const query = Object.fromEntries(queryEntries);

  return query;
}
