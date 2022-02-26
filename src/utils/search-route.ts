import queryString from 'query-string';

import { FilterCategory } from '@/modules/tags';

export const searchRoute = {
  filters: {
    excludeCategory: (url: string, category: FilterCategory): string =>
      queryString.exclude(url, [category]),
    categoryParam: (url: string): FilterCategory | null => {
      const parsedUrlQuery = queryString.parseUrl(url).query;
      return 'category' in parsedUrlQuery
        ? (parsedUrlQuery['category'] as FilterCategory)
        : null;
    },
    categoryUrl: (url: string, category: FilterCategory): string =>
      url + '/filters?' + queryString.stringify({ category }),
  },
};
