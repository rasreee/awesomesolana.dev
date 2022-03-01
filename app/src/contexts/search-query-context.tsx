import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import { createContext, useContext, useMemo } from 'react';

import { allTags } from '@/domains/tags/tags.constants';
import { tagUtils } from '@/domains/tags/tags.utils';
import { Tag, TagType } from '@/domains/tags/types';
import { searchQuery, SearchQueryArgs } from '@/lib/searchQuery';

export interface SearchQueryContext {
  term: string;
  setTerm: (term: string) => void;
  tags: Tag[];
  toggleTag: (tag: Tag) => void;
  clearTags: (type: TagType) => void;
  routeTo: (pathname: string, args: SearchQueryArgs) => void;
}

export const searchQueryContext = createContext<SearchQueryContext>(
  {} as SearchQueryContext,
);

export const useSearchQuery = (): SearchQueryContext =>
  useContext(searchQueryContext);

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

  const tags = useMemo(() => {
    const tagList: Tag[] = Object.entries(searchQuery)
      .filter(([type]) => type !== 'term')
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

  return (
    <searchQueryContext.Provider
      value={{ term, setTerm, tags, toggleTag, clearTags, routeTo }}
    >
      {children}
    </searchQueryContext.Provider>
  );
};
