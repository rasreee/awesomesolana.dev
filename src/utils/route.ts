import { NextRouter } from 'next/router';
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
    categoryUrl: (category: FilterCategory) =>
      '/search/filters?' + queryString.stringify({ category }),
    openCategory: (category: FilterCategory, router: NextRouter) =>
      router.replace(searchRoute.filters.categoryUrl(category), undefined, {
        shallow: true,
      }),
  },
};

export const route = {
  search: {
    clearCategory: (category: FilterCategory, router: NextRouter) => {
      router.push(searchRoute.filters.excludeCategory(router.asPath, category));
    },
    filters: {
      getCategory: (asPath: string) =>
        searchRoute.filters.categoryParam(asPath),
      openCategory: (category: FilterCategory, router: NextRouter) =>
        router.push(searchRoute.filters.categoryUrl(category), undefined, {
          shallow: true,
        }),
      closeCategory: (router: NextRouter) => {
        router.back();
      },
      clearCategory: (category: FilterCategory, router: NextRouter) => {
        router.push(
          searchRoute.filters.excludeCategory(router.asPath, category),
        );
      },
    },
  },
};
