import { useState } from 'react';

import { filtersByType, SearchFilter, toPluralFilterType } from '@/api/filters';
import { capitalizeFirst } from '@/common/utils';
import { useSearch } from '@/contexts/search';
import { Popover, SolidButton } from '@/ui/components';
import { PlusIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

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
      <SolidButton
        onClick={openMenu}
        className={clsxm(
          'flex max-w-min items-center justify-between gap-2',
          'relative',
        )}
      >
        <span className="max-w-[9rem] truncate text-sm leading-none md:max-w-[10rem]">
          {capitalizeFirst(toPluralFilterType(type))}
        </span>
        <div
          className={clsxm(
            Boolean(count) ? 'bg-color-primary text-white' : '',
            'h-5 w-5 min-w-[1.25rem] rounded-full',
            'flex items-center justify-center',
          )}
        >
          {Boolean(count) ? (
            <span className="my-auto text-xs font-semibold leading-none">
              {count}
            </span>
          ) : (
            <PlusIcon className="absolute right-2.5 h-4 w-4" />
          )}
        </div>
      </SolidButton>
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
