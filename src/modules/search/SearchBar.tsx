import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { ErrorMessage } from '@/ui/ErrorMessage';
import { SearchInput } from '@/ui/SearchInput';
import { StatefulSearchIcon } from '@/ui/StatefulSearchIcon';

import { Search } from './search';
import { searchTags } from './tags';
import { useSearch } from './useSearch';

export const SearchBar = () => {
  const router = useRouter();

  const [search, setSearch] = useState<Search>({});

  useEffect(() => {
    const urlQuery = search.tags
      ? `?tags=${search.tags.map((tag) => tag.name).join(',')}`
      : '';

    router.push(`/search${urlQuery}`);
  }, [search.tags]);

  const { error, isRequesting, bindInput } = useSearch({
    searchFn: (q) => searchTags(q),
    onSuccess: (tags) =>
      setSearch((prev) => ({ ...prev, tags: [...(prev.tags ?? []), ...tags] })),
  });

  return (
    <div className="flex items-center gap-1 px-5 py-2">
      <ErrorMessage>{error}</ErrorMessage>
      <StatefulSearchIcon isRequesting={isRequesting} />
      <SearchInput
        placeholder="Search for GitHub repositories by dependency or topic"
        {...bindInput}
      />
    </div>
  );
};
