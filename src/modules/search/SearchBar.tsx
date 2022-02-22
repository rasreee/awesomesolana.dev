import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useAutoFocusedInput } from '@/hooks/useInput';
import { ErrorMessage } from '@/ui/ErrorMessage';
import { SearchInput } from '@/ui/SearchInput';
import { StatefulSearchIcon } from '@/ui/StatefulSearchIcon';

import { useSearch } from './SearchContext';
import { searchTags, Tag } from './tags';
import { useSearchQuery } from './useSearchQuery';

const PLACEHOLDER_TEXT = 'Search for any project, dependency, or topic';

export const SearchBar = () => {
  const router = useRouter();
  const { search } = useSearch();

  const { value: query, ...bindInput } = useAutoFocusedInput({
    value: search.query,
  });

  useEffect(() => {
    if (router.asPath === '/' && (!query || !search.tags?.length)) return;

    const urlQuery = search.tags?.length
      ? `?tags=${search.tags.map((tag) => tag.name).join(',')}`
      : '';

    router.push(`/search${urlQuery}`);
  }, [search.tags]);

  const handleSuccess = (tags: Tag[]) => {
    if (!tags.length && !search.tags?.length) return;

    // setSearch((prev) => {
    //   let newTags: Tag[] = [...tags];
    //   if (search.tags) {
    //     newTags = [...newTags, ...search.tags];
    //   }
    //   return { ...prev, tags: newTags };
    // });
  };

  const { error, isRequesting } = useSearchQuery(query, {
    searchFn: searchTags,
    onSuccess: handleSuccess,
  });

  return (
    <div className="flex items-center gap-1 px-5 py-2">
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulSearchIcon isRequesting={isRequesting} />
      <SearchInput
        placeholder={PLACEHOLDER_TEXT}
        value={query}
        {...bindInput}
      />
    </div>
  );
};
