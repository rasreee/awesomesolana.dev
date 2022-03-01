import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { createContext, useContext, useMemo } from 'react';

import { tagTypes } from '@/domains/tags/tags.constants';
import { tagUtils, toTag } from '@/domains/tags/tags.utils';
import { Tag, TagType } from '@/domains/tags/types';
import { searchQuery, SearchQueryArgs } from '@/lib/searchQuery';

interface ISearchQueryContext {
  term: string;
  setTerm: (term: string) => void;
  tags: Tag[];
  toggleTag: (tag: Tag) => void;
  clearTags: (type: TagType) => void;
  routeTo: (pathname: string, args: SearchQueryArgs) => void;
}

export const SearchQueryContext = createContext<ISearchQueryContext>(
  {} as ISearchQueryContext,
);

export const useSearchQuery = (): ISearchQueryContext =>
  useContext(SearchQueryContext);

const parseQueryParam = (query: ParsedUrlQuery, key: string): string => {
  if (key in query) return query[key] as string;

  return '';
};

export const SearchQueryProvider: React.FC = ({ children }) => {
  const router = useRouter();

  const term = useMemo(
    () => parseQueryParam(router.query, 'term'),
    [router.query],
  );

  const tags = useMemo(
    () =>
      [...tagTypes.map((type) => parseQueryParam(router.query, type))]
        .filter(Boolean)
        .map(toTag),
    [router.query],
  );

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

  return (
    <SearchQueryContext.Provider
      value={{ term, setTerm, tags, toggleTag, clearTags, routeTo }}
    >
      {children}
    </SearchQueryContext.Provider>
  );
};
