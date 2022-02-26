import { NextRouter } from 'next/router';
import queryString from 'query-string';

import { TagType } from '@/modules/tags';

export const searchRoute = {
  tags: {
    excludeType: (url: string, type: TagType): string =>
      queryString.exclude(url, [type]),
    typeParam: (url: string): TagType | null => {
      const parsedUrlQuery = queryString.parseUrl(url).query;
      return 'type' in parsedUrlQuery
        ? (parsedUrlQuery['type'] as TagType)
        : null;
    },
    typeUrl: (type: TagType) =>
      '/search/tags?' + queryString.stringify({ type }),
    openType: (type: TagType, router: NextRouter) =>
      router.replace(searchRoute.tags.typeUrl(type), undefined, {
        shallow: true,
      }),
  },
};

export const route = {
  search: {
    clearType: (type: TagType, router: NextRouter) => {
      router.push(searchRoute.tags.excludeType(router.asPath, type));
    },
    tags: {
      getType: (asPath: string) => searchRoute.tags.typeParam(asPath),
      openType: (type: TagType, router: NextRouter) =>
        router.push(searchRoute.tags.typeUrl(type), undefined, {
          shallow: true,
        }),
      closeType: (router: NextRouter) => {
        router.back();
      },
      clearType: (type: TagType, router: NextRouter) => {
        router.push(searchRoute.tags.excludeType(router.asPath, type));
      },
    },
  },
};
