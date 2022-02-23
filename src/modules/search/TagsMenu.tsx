import { useState } from 'react';

import {
  allTagsByType,
  ContentTag,
  filterTagsByType,
  searchTags,
  sortTagsByProjectCount,
  TAG_TYPE_TO_PLURAL,
} from '@/data/tags';
import { capitalizeFirst } from '@/lib/capitalizeFirst';
import clsxm from '@/lib/clsxm';
import { Popover, TextInput } from '@/ui/components';

import { useSearch } from './SearchContext';

type TagsMenuProps = { type: ContentTag['type'] };

export const TagsMenu = ({ type }: TagsMenuProps) => {
  const { search } = useSearch();

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);

  const closeMenu = () => setOpen(false);

  return (
    <>
      <button
        onClick={openMenu}
        className={clsxm(
          open && 'border border-base-400 dark:border-base-400',
          filterTagsByType(search.tags ?? [], type)?.length > 0
            ? 'text'
            : 'text-hint',
          'bg-surface flex w-full items-center justify-between gap-3 rounded-md bg-opacity-70 px-4 py-2 hover:bg-opacity-90 active:bg-opacity-100',
        )}
      >
        <span className="text-base leading-none">
          {capitalizeFirst(TAG_TYPE_TO_PLURAL[type])}
        </span>
        <div className="bg-surface-2 flex h-5 w-5 items-center justify-center rounded-full">
          <span className="my-auto text-xs font-medium leading-none">
            {filterTagsByType(search.tags ?? [], type)?.length ?? 0}
          </span>
        </div>
      </button>
      <Popover
        className="bg-surface fixed top-0 left-0 min-w-full max-w-fit rounded-none px-2 py-3"
        isOpen={open}
        onRequestClose={closeMenu}
      >
        <TagsSearch type={type} onRequestClose={closeMenu} />
      </Popover>
    </>
  );
};

function TagsSearch({
  type,
  onRequestClose,
}: {
  type: ContentTag['type'];
  onRequestClose: () => void;
}) {
  const { addTag, removeTag, getFilterChecked, clearFiltersByType } =
    useSearch();

  const [query, setQuery] = useState('');

  const onClickTag = (tag: ContentTag) => () => {
    if (!getFilterChecked(tag)) {
      addTag(tag);
    } else {
      removeTag(tag);
    }
    setQuery('');
  };

  const tagsToShow = sortTagsByProjectCount(
    query ? searchTags(query, (tag) => tag.type === type) : allTagsByType(type),
  );

  return (
    <div className="relative z-0 h-screen overflow-y-auto">
      <div className="bg-surface sticky top-0 left-0 z-50 max-h-min w-full px-4 py-2">
        <div className="flex items-center justify-between py-4 pb-7">
          <button
            className="text bg-surface-1 rounded-lg bg-opacity-80 px-3 py-1 font-medium text-opacity-70"
            onClick={() => clearFiltersByType(type)}
          >
            Clear
          </button>
          <span className="text-lg font-semibold">
            {capitalizeFirst(TAG_TYPE_TO_PLURAL[type])}
          </span>
          <button
            className="text rounded-lg bg-indigo-600 px-3 py-1 font-medium"
            onClick={onRequestClose}
          >
            Done
          </button>
        </div>
        <TextInput
          type="search"
          name={`${type}-filter-search`}
          value={query}
          onChange={setQuery}
          placeholder={`Search ${TAG_TYPE_TO_PLURAL[type]}...`}
          className="bg-app w-full rounded-md py-3 text-base placeholder:text-base"
        />
      </div>
      <div className="absolute z-0 flex-1">
        <ul
          className={clsxm(
            'flex w-full flex-col items-center gap-3 overflow-y-auto pt-5',
          )}
        >
          {tagsToShow.map((tag) => (
            <li
              key={tag.name}
              className="flex w-full cursor-pointer items-center justify-between gap-2 px-1 py-1.5"
              onClick={onClickTag(tag)}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="bg-app rounded border-none"
                  checked={getFilterChecked(tag)}
                />
                <span className="text-lg leading-none">{tag.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
