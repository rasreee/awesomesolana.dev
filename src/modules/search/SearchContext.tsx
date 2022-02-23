import { useRouter } from 'next/router';
import { createContext, useContext, useMemo } from 'react';

import { ContentTag, filterTagsByType } from '@/modules/tags';

import { parseSearch, Search } from './search';

export type ISearchContext = {
  search: Search;
  addTag: (tag: ContentTag) => void;
  removeTag: (tag: ContentTag) => void;
  getTags: (type: ContentTag['type']) => ContentTag[];
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

  const getTags = (type: ContentTag['type']) =>
    search.tags ? filterTagsByType(search.tags, type) : [];

  return (
    <SearchContext.Provider value={{ search, removeTag, addTag, getTags }}>
      {children}
    </SearchContext.Provider>
  );
}
