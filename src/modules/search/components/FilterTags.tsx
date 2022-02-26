import { useSearchFilters, useToggleFilter } from '@modules/search';
import { Tag } from '@modules/tags';
import pluralize from '@utils/pluralize';

import { useIsMobile } from '@/ui/hooks';
import { XIcon } from '@/ui/icons';

import { FilterTag } from './FilterTag';

const MOBILE_PREVIEW_SIZE = 5;

export function FilterTags() {
  const searchFilters = useSearchFilters();
  const toggleFilter = useToggleFilter();
  const isMobile = useIsMobile();

  const handleToggleFilter = (tag: Tag) => () => toggleFilter(tag);

  const listToShow = isMobile
    ? searchFilters.slice(0, MOBILE_PREVIEW_SIZE)
    : searchFilters;

  return (
    <ul className="flex flex-wrap items-center gap-2">
      {listToShow.map((tag) => (
        <li key={`${tag.category}_${tag.name}`}>
          <FilterTag
            className="max-w-[9rem] gap-1 px-1.5"
            tag={tag}
            onClick={handleToggleFilter(tag)}
            postFix={
              <button
                className="opacity-60 hover:opacity-80 active:opacity-100"
                onClick={handleToggleFilter(tag)}
              >
                <XIcon className="my-auto h-4 w-4" />
              </button>
            }
          />
        </li>
      ))}
      {isMobile && searchFilters.length > MOBILE_PREVIEW_SIZE && (
        <li>
          <span className="text-hint text-sm leading-none">
            + {searchFilters.length - listToShow.length} more{' '}
            {pluralize('tag', searchFilters.length - listToShow.length)}...
          </span>
        </li>
      )}
    </ul>
  );
}
