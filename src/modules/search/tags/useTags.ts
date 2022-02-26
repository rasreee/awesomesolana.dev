import useSWR from 'swr';

import { getTags, Tag, TagType } from '@/core/search';

export function useTags(type: TagType | null | undefined) {
  return useSWR<Tag[], Error>(`tags` + type ? `?type=${type}` : '', () =>
    getTags(type),
  );
}
