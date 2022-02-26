import { FILTER_CATEGORIES, Tag } from '@modules/tags';
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

  const filters = useMemo(() => parseSearch(router.query), [router.query]);

  return { filters, query };
}
