import { NextRouter, useRouter } from 'next/router';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

import { filtersByType, getFilterTypes, SearchFilter } from '@/api/filters';
import {
  filterProjectsByTitle,
  Project,
  useProjectsByTags,
} from '@/api/projects';
import { waitFor } from '@/lib/waitFor';

import { Search } from './types';

export type ISearchContext = {
  search: Search;
  query: string;
  setQuery: (query: string) => void;
  error: string | null;
  setError: (error: string | null) => void;
  isRequesting: boolean;
  setIsRequesting: (value: boolean) => void;
  filteredProjects: Project[];
  addFilter: (tag: SearchFilter) => void;
  removeFilter: (tag: SearchFilter) => void;
  getFilterChecked: (tag: SearchFilter) => boolean;
  clearFilters: () => void;
  clearFiltersByType: (type: SearchFilter['type']) => void;
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

  const tags: SearchFilter[] = [];

  const keys = Object.keys(parsedUrlQuery);

  getFilterTypes().forEach((type) => {
    if (keys.includes(type)) {
      console.log(`keys.includes(${type})`, keys.includes(type));
      const tagsForType = (parsedUrlQuery[type] as string)
        .split(',')
        .map((name) => ({ type, name }));

      tags.push(...tagsForType);
    }
  });

  search.tags = tags;

  return search;
}

export function SearchProvider({ children }: { children: any }) {
  const router = useRouter();

  const [query, setQuery] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);

  const search = useMemo(() => parseSearch(router.query), [router.query]);
  const { data: allProjects } = useProjectsByTags(search.tags);

  useEffect(() => {
    if (!allProjects || !query) return;

    const submitQuery = async (query: string) => {
      setIsRequesting(true);
      setError(null);
      try {
        const newFilteredProjects = filterProjectsByTitle(
          allProjects ?? [],
          query,
        );
        setFilteredProjects(newFilteredProjects);
      } catch (e) {
        setError((e as Error).message);
      } finally {
        setIsRequesting(false);
      }
    };

    waitFor(300).then(() => submitQuery(query));
  }, [query, allProjects]);

  const removeFilter = (tagToRemove: SearchFilter) => {
    const { tags } = search;

    if (!tags) return;

    const newTags = tags.filter((tag) => tag.name !== tagToRemove.name);

    let newPath = `/search`;

    getFilterTypes().forEach((type) => {
      const tagsForType = newTags.filter((tag) => tag.type === type);
      if (tagsForType.length > 0) {
        const prefix = newPath === '/search' ? '?' : '&';
        newPath =
          newPath +
          prefix +
          type +
          `=${newTags
            .filter((tag) => tag.type === type)
            .map((tag) => tag.name)
            .join(',')}`;
      }
    });

    router.push(newPath);
  };

  const addFilter = (tagToAdd: SearchFilter) => {
    const { tags: oldTags } = search;
    const newTags = oldTags ? [...oldTags, tagToAdd] : [tagToAdd];

    let newPath = `/search`;

    getFilterTypes().forEach((type) => {
      const tagsForType = newTags.filter((tag) => tag.type === type);

      if (tagsForType.length > 0) {
        const prefix = newPath === '/search' ? '?' : '&';
        newPath =
          newPath +
          prefix +
          type +
          `=${tagsForType.map((tag) => tag.name).join(',')}`;
      }
    });

    router.push(newPath);
  };

  const clearFilters = () => {
    router.push('/search');
  };

  const getFilterChecked = (filter: SearchFilter): boolean => {
    const tags = search.tags ?? [];
    return filtersByType(tags, filter.type)
      .map((item) => item.name)
      .includes(filter.name);
  };

  const clearFiltersByType = (typeToRemove: SearchFilter['type']) => {
    const oldTags = search.tags ?? [];

    let newPath = `/search`;

    getFilterTypes()
      .filter((type) => type !== typeToRemove)
      .forEach((type) => {
        const tagsForType = oldTags.filter((tag) => tag.type === type);

        if (tagsForType.length > 0) {
          const prefix = newPath === '/search' ? '?' : '&';
          newPath =
            newPath +
            prefix +
            type +
            `=${tagsForType.map((tag) => tag.name).join(',')}`;
        }
      });

    router.push(newPath);
  };

  return (
    <SearchContext.Provider
      value={{
        search,
        query,
        setQuery,
        error,
        setError,
        isRequesting,
        setIsRequesting,
        removeFilter,
        addFilter,
        clearFilters,
        getFilterChecked,
        clearFiltersByType,
        filteredProjects,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}
