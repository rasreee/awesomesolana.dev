import { useRouter } from 'next/router';
import { useState } from 'react';

import {
  allTagsByType,
  ContentTag,
  filterTagsByType,
  searchTags,
  TAG_TYPE_TO_PLURAL,
} from '@/data/tags';
import { TextInput } from '@/ui/components';

import { useSearch } from '../SearchContext';

export function FilterMenu({ type }: { type: ContentTag['type'] }) {
  const { search, addTag, removeTag } = useSearch();

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => setExpanded((prev) => !prev);

  const [query, setQuery] = useState('');

  const onClickItem = (filter: ContentTag) => () => {
    if (!getFilterChecked(filter)) {
      addTag(filter);
    } else {
      removeTag(filter);
    }
    setQuery('');
  };

  const getFilterChecked = (filter: ContentTag): boolean => {
    const tags = search.tags ?? [];
    return filterTagsByType(tags, filter.type)
      .map((item) => item.name)
      .includes(filter.name);
  };

  const previewOptions = allTagsByType(type).slice(0, expanded ? 10 : 5);
  const tagsToShow = query
    ? searchTags(query, (tag) => tag.type === type)
    : previewOptions;

  const router = useRouter();

  const clearFiltersByType = () => {
    const oldTags = search.tags ?? [];

    const newTags = oldTags.filter((tag) => tag.type !== type);
    if (newTags.length === 0) return router.push('/search');

    router.push(
      `/search?tags=${encodeURIComponent(
        newTags.map((tag) => tag.name).join(','),
      )}`,
    );
  };

  const selectedCount = filterTagsByType(search.tags ?? [], type).length;

  return (
    <div className="flex flex-col">
      <div className="bg-app flex items-center gap-1 rounded-md pr-3">
        <TextInput
          type="search"
          name={`${type}-filter-search`}
          value={query}
          onChange={setQuery}
          placeholder={`Search ${TAG_TYPE_TO_PLURAL[type]}...`}
          className="bg-app rounded-md text-base placeholder:text-base"
        />
        {selectedCount > 0 && (
          <button
            onClick={clearFiltersByType}
            className="bg-surface rounded-md py-1.5 px-2.5 text-sm leading-none transition hover:font-medium"
          >
            Clear
          </button>
        )}
      </div>
      <ul>
        {tagsToShow.map((filter) => (
          <FilterOption
            key={filter.name}
            name={filter.name}
            onClick={onClickItem(filter)}
            checked={getFilterChecked(filter)}
          />
        ))}
      </ul>
      <button
        className="max-w-max px-3 py-1 text-left font-medium hover:font-semibold"
        onClick={toggleExpanded}
      >
        Show {expanded ? 'less' : 'more'}
      </button>
    </div>
  );
}

function FilterOption({
  name,
  onClick,
  checked,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & {
  name: string;
  onClick: () => void;
  checked: boolean;
}) {
  return (
    <li
      {...props}
      className="flex cursor-pointer items-center gap-2 px-3 py-1"
      onClick={onClick}
    >
      <input type="checkbox" checked={checked} />
      <span className="text-base">{name}</span>
    </li>
  );
}
