import { useMemo } from 'react';

import { TagType, useSearchState } from '@/core/search';
import { getIntersection } from '@/utils';

import { useTags } from './useTags';

export function useSelectedTags(type: TagType) {
  const { data: tagsForType } = useTags(type);
  const { tags } = useSearchState();

  return useMemo(
    () =>
      tagsForType
        ? getIntersection(tagsForType, tags, (a, b) => a.name === b.name)
        : undefined,
    [tags, tagsForType],
  );
}
