import { useSearchState } from '@core/search';
import { useRouter } from 'next/router';

import { tagTypes } from './constants';
import { Tag } from './types';

export function useToggleTag() {
  const router = useRouter();
  const { tags } = useSearchState();

  const getIsTagActive = (input: Tag): boolean => {
    return tags
      .filter((tag) => tag.type === input.type)
      .map((item) => item.name)
      .includes(input.name);
  };

  const addTag = (tagToAdd: Tag) => {
    const oldTags = tags;
    const newTags = oldTags ? [...oldTags, tagToAdd] : [tagToAdd];

    let newPath = `/search`;

    tagTypes.forEach((type) => {
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

  const removeTag = (tagToRemove: Tag) => {
    const newTags = tags.filter((tag) => tag.name !== tagToRemove.name);

    let newPath = `/search`;

    tagTypes.forEach((type) => {
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

  const toggleTag = (tag: Tag) => {
    if (!getIsTagActive(tag)) {
      addTag(tag);
    } else {
      removeTag(tag);
    }
  };

  return toggleTag;
}
