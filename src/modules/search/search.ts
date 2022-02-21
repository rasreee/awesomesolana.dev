import { NextRouter } from 'next/router';

export type Search = {
  query?: string;
  tags?: any[];
};

export function parseSearch(parsedUrlQuery: NextRouter['query']): Search {
  const search: Search = {};

  if ('query' in parsedUrlQuery) {
    search.query = parsedUrlQuery['query'] as string;
  }
  if ('tags' in parsedUrlQuery) {
    search.tags = (parsedUrlQuery['tags'] as string).split(',');
  }

  return search;
}
