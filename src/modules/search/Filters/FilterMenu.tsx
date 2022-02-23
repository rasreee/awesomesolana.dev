import { useState } from 'react';

import { getProjectsCountForTag } from '@/data/projects';
import {
  allTagsByType,
  ContentTag,
  filterTagsByType,
  getTagKey,
  searchTags,
  sortTagsByProjectCount,
  TAG_TYPE_TO_PLURAL,
} from '@/data/tags';
import { TextInput } from '@/ui/components';

import { useSearch } from '../SearchContext';

export function FilterMenu({ type }: { type: ContentTag['type'] }) {
  const { search, addTag, removeTag, getFilterChecked, clearFiltersByType } =
    useSearch();

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

  const previewOptions = allTagsByType(type).slice(0, expanded ? 10 : 5);

  const tagsToShow = sortTagsByProjectCount(
    query ? searchTags(query, (tag) => tag.type === type) : previewOptions,
  );

  const selectedCount = filterTagsByType(search.tags ?? [], type).length;

  const canShowMore = tagsToShow.length > 0;

  return (
    <div className="flex flex-col">
      <div className="bg-app flex items-center gap-1 rounded-md pr-3">
        <TextInput
          type="search"
          name={`${type}-filter-search`}
          value={query}
          onChange={setQuery}
          placeholder={`Search ${TAG_TYPE_TO_PLURAL[type]}...`}
          className="bg-app rounded-md text-sm leading-none placeholder:text-sm placeholder:leading-none"
        />
        {selectedCount > 0 && (
          <button
            onClick={() => clearFiltersByType(type)}
            className="bg-surface rounded-md py-1.5 px-2.5 text-sm leading-none transition hover:font-medium"
          >
            Clear
          </button>
        )}
      </div>
      <ul>
        {tagsToShow.map((tag) => (
          <FilterOption
            key={getTagKey(tag)}
            tag={tag}
            onClick={onClickItem(tag)}
            checked={getFilterChecked(tag)}
          />
        ))}
      </ul>
      {canShowMore && (
        <button
          className="max-w-max py-2 text-left text-base font-normal leading-none hover:font-medium"
          onClick={toggleExpanded}
        >
          Show {expanded ? 'less' : 'more'}
        </button>
      )}
    </div>
  );
}

function FilterOption({
  tag,
  onClick,
  checked,
  ...props
}: React.HTMLAttributes<HTMLLIElement> & {
  tag: ContentTag;
  onClick: () => void;
  checked: boolean;
}) {
  const count = getProjectsCountForTag(tag);

  return (
    <li
      {...props}
      className="flex cursor-pointer items-center justify-between gap-2 px-1 py-2.5"
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          className="bg-app rounded border-none"
          checked={checked}
        />
        <span className="text-sm leading-none">{tag.name}</span>
      </div>
      <span className="bg-surface-2 rounded-lg px-1.5 py-0.5 text-xs leading-none">
        {count}
      </span>
    </li>
  );
}
