import { NextRouter, useRouter } from 'next/router';
import { createContext, useContext, useMemo } from 'react';

import { FILTER_CATEGORIES, FilterCategory, Tag } from '@/api/tags';

type Search = {
  query?: string;
  tags?: Tag[];
};

export type ISearchContext = {
  search: Search;
  hasFilters: boolean;
  getFiltersCountByType: (category: FilterCategory) => number;
  addFilter: (tag: Tag) => void;
  removeFilter: (tag: Tag) => void;
  toggleFilter: (tag: Tag) => void;
  getIsFilterActive: (tag: Tag) => boolean;
  clearFilters: () => void;
  clearFiltersByType: (category: Tag['category']) => void;
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

  const tags: Tag[] = [];

  const keys = Object.keys(parsedUrlQuery);

  FILTER_CATEGORIES.forEach((category) => {
    if (keys.includes(category)) {
      console.log(`keys.includes(${category})`, keys.includes(category));
      const tagsForType = (parsedUrlQuery[category] as string)
        .split(',')
        .map((name) => ({ category, name }));

      tags.push(...tagsForType);
    }
  });

  search.tags = tags;

  return search;
}

export function SearchProvider({ children }: { children: any }) {
  const router = useRouter();

  const search = useMemo(() => parseSearch(router.query), [router.query]);

  const removeFilter = (tagToRemove: Tag) => {
    const { tags } = search;

    if (!tags) return;

    const newTags = tags.filter((tag) => tag.name !== tagToRemove.name);

    let newPath = `/search`;

    FILTER_CATEGORIES.forEach((category) => {
      const tagsForType = newTags.filter((tag) => tag.category === category);
      if (tagsForType.length > 0) {
        const prefix = newPath === '/search' ? '?' : '&';
        newPath =
          newPath +
          prefix +
          category +
          `=${newTags
            .filter((tag) => tag.category === category)
            .map((tag) => tag.name)
            .join(',')}`;
      }
    });

    router.push(newPath);
  };

  const addFilter = (tagToAdd: Tag) => {
    const { tags: oldTags } = search;
    const newTags = oldTags ? [...oldTags, tagToAdd] : [tagToAdd];

    let newPath = `/search`;

    FILTER_CATEGORIES.forEach((category) => {
      const tagsForType = newTags.filter((tag) => tag.category === category);

      if (tagsForType.length > 0) {
        const prefix = newPath === '/search' ? '?' : '&';
        newPath =
          newPath +
          prefix +
          category +
          `=${tagsForType.map((tag) => tag.name).join(',')}`;
      }
    });

    router.push(newPath);
  };

  const clearFilters = () => {
    router.push('/search');
  };

  const getIsFilterActive = (input: Tag): boolean => {
    const tags = search.tags ?? [];

    return tags
      .filter((tag) => tag.category === input.category)
      .map((item) => item.name)
      .includes(input.name);
  };

  const getFiltersCountByType = (category: FilterCategory): number => {
    return (search.tags ?? []).filter((filter) => filter.category === category)
      .length;
  };

  const clearFiltersByType = (typeToRemove: Tag['category']) => {
    const oldTags = search.tags ?? [];

    let newPath = `/search`;

    FILTER_CATEGORIES.filter((category) => category !== typeToRemove).forEach(
      (category) => {
        const tagsForType = oldTags.filter((tag) => tag.category === category);

        if (tagsForType.length > 0) {
          const prefix = newPath === '/search' ? '?' : '&';
          newPath =
            newPath +
            prefix +
            category +
            `=${tagsForType.map((tag) => tag.name).join(',')}`;
        }
      },
    );

    router.push(newPath);
  };

  const toggleFilter = (tag: Tag) => {
    if (!getIsFilterActive(tag)) {
      addFilter(tag);
    } else {
      removeFilter(tag);
    }
  };

  const hasFilters = Boolean(search.tags?.length);

  return (
    <SearchContext.Provider
      value={{
        search,
        hasFilters,
        removeFilter,
        addFilter,
        clearFilters,
        getIsFilterActive,
        clearFiltersByType,
        toggleFilter,
        getFiltersCountByType,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
