import { Tag, TAG_TYPES } from '@core/search';
import { normalizeQueryParam } from '@utils/query';
import { NextRouter, useRouter } from 'next/router';
import { useMemo } from 'react';

export function useSearchState() {
  const router = useRouter();

  const query = useMemo(
    () => ('q' in router.query ? normalizeQueryParam(router.query.q) : ''),
    [router.query],
  );

  function parseSearch(parsedUrlQuery: NextRouter['query']): Tag[] {
    const tags: Tag[] = [];

    const keys = Object.keys(parsedUrlQuery);

    TAG_TYPES.forEach((type) => {
      if (keys.includes(type)) {
        const tagsForType = (parsedUrlQuery[type] as string)
          .split(',')
          .map((name) => ({ type, name }));

        tags.push(...tagsForType);
      }
    });

    return tags;
  }

  const tags = useMemo(() => parseSearch(router.query), [router.query]);

  return { tags, query };
}
