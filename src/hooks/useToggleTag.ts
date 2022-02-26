import { useRouter } from 'next/router';

import { Tag, TAG_TYPES } from '@/modules/tags';

import { useSearchState } from './useSearchState';

export function useToggleTag() {
  const router = useRouter();
  const { tags: allFilters } = useSearchState();

  const getIsFilterActive = (input: Tag): boolean => {
    return allFilters
      .filter((tag) => tag.type === input.type)
      .map((item) => item.name)
      .includes(input.name);
  };

  const addFilter = (tagToAdd: Tag) => {
    const oldTags = allFilters;
    const newTags = oldTags ? [...oldTags, tagToAdd] : [tagToAdd];

    let newPath = `/search`;

    TAG_TYPES.forEach((type) => {
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

  const removeFilter = (tagToRemove: Tag) => {
    const newTags = allFilters.filter((tag) => tag.name !== tagToRemove.name);

    let newPath = `/search`;

    TAG_TYPES.forEach((type) => {
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

  const toggleFilter = (tag: Tag) => {
    if (!getIsFilterActive(tag)) {
      addFilter(tag);
    } else {
      removeFilter(tag);
    }
  };

  return toggleFilter;
}
