import { NextRouter, useRouter } from 'next/router';
import { createContext, useContext, useMemo } from 'react';

import { ContentTag, filterTagsByType, getContentTag } from '@/data/tags';

import { Search } from './types';

export type ISearchContext = {
  search: Search;
  addTag: (tag: ContentTag) => void;
  removeTag: (tag: ContentTag) => void;
  getFilterChecked: (tag: ContentTag) => boolean;
  getTags: (type: ContentTag['type']) => ContentTag[];
  clearFilters: () => void;
  clearFiltersByType: (type: ContentTag['type']) => void;
};

export const SearchContext = createContext<ISearchContext | undefined>(
  undefined,
);

export function useSearch() {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error('SearchContext must be defined to use useSearch');
  return context;
}

function parseSearch(parsedUrlQuery: NextRouter['query']): Search {
  const search: Search = {};

  if ('query' in parsedUrlQuery) {
    search.query = parsedUrlQuery['query'] as string;
  }
  if ('tags' in parsedUrlQuery) {
    search.tags = (parsedUrlQuery['tags'] as string)
      .split(',')
      .map(getContentTag);
  }

  return search;
}

export function SearchProvider({ children }: { children: any }) {
  const router = useRouter();

  const search = useMemo(() => parseSearch(router.query), [router.query]);

  const removeTag = (tagToRemove: ContentTag) => {
    const { tags } = search;

    if (!tags) return;

    const newTags = tags.filter((tag) => tag.name !== tagToRemove.name);

    const newPath =
      newTags.length > 0
        ? `/search?tags=${encodeURIComponent(
            newTags.map((tag) => tag.name).join(','),
          )}`
        : `/search`;

    router.push(newPath);
  };

  const addTag = (tagToAdd: ContentTag) => {
    let newPath = `/search?tags=${encodeURIComponent(tagToAdd.name)}`;

    const { tags: oldTags } = search;
    if (oldTags) {
      const newTags = [...oldTags, tagToAdd];
      newPath =
        newTags.length > 0
          ? `/search?tags=${encodeURIComponent(
              newTags.map((tag) => tag.name).join(','),
            )}`
          : `/search`;
    }

    router.push(newPath);
  };

  const clearFilters = () => {
    router.push('/search');
  };

  const getTags = (type: ContentTag['type']) =>
    search.tags ? filterTagsByType(search.tags, type) : [];

  const getFilterChecked = (filter: ContentTag): boolean => {
    const tags = search.tags ?? [];
    return filterTagsByType(tags, filter.type)
      .map((item) => item.name)
      .includes(filter.name);
  };

  const clearFiltersByType = (type: ContentTag['type']) => {
    const oldTags = search.tags ?? [];

    const newTags = oldTags.filter((tag) => tag.type !== type);
    if (newTags.length === 0) return router.push('/search');

    router.push(
      `/search?tags=${encodeURIComponent(
        newTags.map((tag) => tag.name).join(','),
      )}`,
    );
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        removeTag,
        addTag,
        getTags,
        clearFilters,
        getFilterChecked,
        clearFiltersByType,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
