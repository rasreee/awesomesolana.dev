import { useState } from 'react';

import { filtersByType, SearchFilter, toPluralFilterType } from '@/api/filters';
import { capitalizeFirst } from '@/lib/capitalizeFirst';
import clsxm from '@/lib/clsxm';
import { Popover } from '@/ui/components';

import { useSearch } from './SearchContext';
import { TagsSearch } from './TagsSearch';

type TagsMenuProps = { type: SearchFilter['type'] };

export const TagsMenu = ({ type }: TagsMenuProps) => {
  const { search } = useSearch();

  const [open, setOpen] = useState(false);

  const openMenu = () => setOpen(true);

  const closeMenu = () => setOpen(false);

  const count = filtersByType(search.tags ?? [], type).length;

  return (
    <>
      <button
        onClick={openMenu}
        className={clsxm(
          open && 'border border-base-400 dark:border-base-400',
          count > 0 ? 'text bg-surface-1' : 'text-hint bg-surface',
          'px-3 py-2',
          'rounded-lg',
          'flex w-full items-center justify-between gap-5 bg-opacity-70 hover:bg-opacity-90 active:bg-opacity-100',
          'md:flex-1',
        )}
      >
        <span className="max-w-[7rem] truncate text-sm leading-none md:max-w-[10rem]">
          {capitalizeFirst(toPluralFilterType(type))}
        </span>
        <div
          className={clsxm(
            count > 0
              ? 'bg-indigo-500 text-white dark:bg-indigo-600'
              : 'bg-surface-2',
            'h-5 w-5 min-w-[1.25rem] rounded-full',
            'flex items-center justify-center',
          )}
        >
          <span className="my-auto text-xs font-semibold leading-none">
            {count}
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
