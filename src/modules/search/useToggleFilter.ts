import { useRouter } from 'next/router';

import { FILTER_CATEGORIES, Tag } from '../tags';
import { useSearchState } from './useSearchState';

export function useToggleFilter() {
  const router = useRouter();
  const { filters: allFilters } = useSearchState();

  const getIsFilterActive = (input: Tag): boolean => {
    return allFilters
      .filter((tag) => tag.category === input.category)
      .map((item) => item.name)
      .includes(input.name);
  };

  const addFilter = (tagToAdd: Tag) => {
    const oldTags = allFilters;
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

  const removeFilter = (tagToRemove: Tag) => {
    const newTags = allFilters.filter((tag) => tag.name !== tagToRemove.name);

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
