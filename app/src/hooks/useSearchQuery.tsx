import { allTags, Tag, TagType, tagUtils } from '@awesomesolana/common';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { createContext, useMemo } from 'react';

import { searchQuery, SearchQueryArgs } from '@/lib/searchQuery';
function parseQueryParam<T extends string | number>(
  query: ParsedUrlQuery,
  key: string,
): T {
  return query[key] as T;
}

export interface SearchQueryContext {
  term: string;
  page: number;
  per_page: number;
  setTerm: (term: string) => void;
  tags: Tag[];
  toggleTag: (tag: Tag) => void;
  clearTags: (type: TagType) => void;
  routeTo: (pathname: string, args: SearchQueryArgs) => void;
}

export const searchQueryContext = createContext<SearchQueryContext>(
  {} as SearchQueryContext,
);

export const useSearchQuery = (): SearchQueryContext => {
  const router = useRouter();

  const term = useMemo(
    () => parseQueryParam<string>(router.query, 'term'),
    [router.query],
  );

  const page = useMemo(
    () => parseQueryParam<number>(router.query, 'page'),
    [router.query],
  );

  const per_page = useMemo(
    () => parseQueryParam<number>(router.query, 'per_page'),
    [router.query],
  );

  const tags = useMemo(() => {
    const tagList: Tag[] = Object.entries(searchQuery)
      .filter(
        ([type]) => type !== 'term' && type !== 'page' && type !== 'per_page',
      )
      .map(([type, value]) => ({
        id: allTags.map((tag) => tag.name).indexOf(value),
        type: `${type}` as TagType,
        name: value,
      }));

    return tagList;
  }, [router.query]);

  const setTerm = (newTerm: string) => {
    router.push(router.pathname, {
      query: searchQuery({ term: newTerm, tags }),
    });
  };

  const toggleTag = (tag: Tag) => {
    const newTags = tagUtils.list(tags).has(tag)
      ? tagUtils.list(tags).exclude([tag])
      : [...tags, tag];
    router.push(router.pathname, {
      query: searchQuery({ tags: newTags, term }),
    });
  };

  const clearTags = (type: TagType) => {
    const newTags = tagUtils.list(tags).excludeType(type);
    router.push(router.pathname, {
      query: searchQuery({ tags: newTags, term }),
    });
  };

  const routeTo = (pathname: string, args: SearchQueryArgs) => {
    router.push(pathname, { query: searchQuery(args) });
  };

  return {
    term,
    page,
    per_page,
    setTerm,
    tags,
    toggleTag,
    clearTags,
    routeTo,
  };
};
