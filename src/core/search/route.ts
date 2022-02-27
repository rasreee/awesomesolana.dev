import { TagType } from '@core/search';
import { NextRouter } from 'next/router';
import queryString from 'query-string';

export const searchRoute = {
  tags: {
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
    tags: {
      getType: (asPath: string) => searchRoute.tags.typeParam(asPath),
      openType: (type: TagType, router: NextRouter) =>
        router.replace(searchRoute.tags.typeUrl(type)),
      closeType: (router: NextRouter) => {
        router.back();
      },
    },
  },
};
