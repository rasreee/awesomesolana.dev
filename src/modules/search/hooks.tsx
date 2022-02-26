import { FILTER_CATEGORIES, FilterCategory, Tag } from '@modules/tags';
import { normalizeQueryParam } from '@utils/query';
import { NextRouter, useRouter } from 'next/router';
import { useMemo, useRef } from 'react';

export function useSearchQuery() {
  const router = useRouter();
  return useMemo(
    () => ('q' in router.query ? normalizeQueryParam(router.query.q) : ''),
    [router.query],
  );
}

export function useSubmitQuery() {
  const router = useRouter();
  const filters = useSearchFilters();

  const { current: restQueryStrings } = useRef(
    filters.map((filter) => filter.category + '=' + filter.name),
  );

  const submitQuery = (query: string) => {
    if (!query) return;

    const newPath = `/search?q=${query}&${restQueryStrings.join('&')}`;

    router.push(newPath);
  };

  return submitQuery;
}

export function useSearchFilters(): Tag[] {
  const router = useRouter();

  function parseSearch(parsedUrlQuery: NextRouter['query']): Tag[] {
    const filters: Tag[] = [];

    const keys = Object.keys(parsedUrlQuery);

    FILTER_CATEGORIES.forEach((category) => {
      if (keys.includes(category)) {
        const tagsForType = (parsedUrlQuery[category] as string)
          .split(',')
          .map((name) => ({ category, name }));

        filters.push(...tagsForType);
      }
    });

    return filters;
  }

  return useMemo(() => parseSearch(router.query), [router.query]);
}

export function useSearchState() {
  const query = useSearchQuery();
  const filters = useSearchFilters();

  return { filters, query };
}

export function useCountFilters() {
  const searchFilters = useSearchFilters();

  const countFiltersForCategory = (category: FilterCategory): number => {
    return searchFilters.filter((filter) => filter.category === category)
      .length;
  };

  return countFiltersForCategory;
}

export function useGetIsFilterActive() {
  const searchFilters = useSearchFilters();

  const getIsFilterActive = (input: Tag): boolean => {
    return searchFilters
      .filter((tag) => tag.category === input.category)
      .map((item) => item.name)
      .includes(input.name);
  };

  return getIsFilterActive;
}

export function useAddFilter() {
  const router = useRouter();

  const searchFilters = useSearchFilters();

  const addFilter = (tagToAdd: Tag) => {
    const oldTags = searchFilters;
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

  return addFilter;
}

export function useToggleFilter() {
  const router = useRouter();
  const searchFilters = useSearchFilters();
  const addFilter = useAddFilter();

  const getIsFilterActive = useGetIsFilterActive();

  const removeFilter = (tagToRemove: Tag) => {
    const newTags = searchFilters.filter(
      (tag) => tag.name !== tagToRemove.name,
    );

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

  const toggleFilter = (tag: Tag) => {
    if (!getIsFilterActive(tag)) {
      addFilter(tag);
    } else {
      removeFilter(tag);
    }
  };

  return toggleFilter;
}

export function useClearFilters() {
  const router = useRouter();

  const searchFilters = useSearchFilters();

  const clearCategory = (categoryToRemove: FilterCategory) => {
    const oldTags = searchFilters;

    let newPath = `/search`;

    FILTER_CATEGORIES.filter(
      (category) => category !== categoryToRemove,
    ).forEach((category) => {
      const tagsForType = oldTags.filter((tag) => tag.category === category);

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

  const clearAll = () => {
    router.push('/search');
  };

  return {
    all: clearAll,
    category: clearCategory,
    handleClearCategory: (category: FilterCategory) => () =>
      clearCategory(category),
  };
}
