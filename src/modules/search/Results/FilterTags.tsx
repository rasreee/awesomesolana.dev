import { Tag } from '@/api/tags';
import { useSearchFilters, useToggleFilter } from '@/contexts/SearchContext';
import { XIcon } from '@/ui/icons';

import { FilterTag } from './FilterTag';

export function FilterTags() {
  const searchFilters = useSearchFilters();
  const toggleFilter = useToggleFilter();

  const handleToggleFilter = (tag: Tag) => () => toggleFilter(tag);

  return (
    <ul className="flex items-center gap-2">
      {searchFilters.map((tag) => (
        <li key={`${tag.category}_${tag.name}`}>
          <FilterTag
            tag={tag}
            onClick={handleToggleFilter(tag)}
            postFix={
              <button
                className="px-1 opacity-60 hover:opacity-80 active:opacity-100"
                onClick={handleToggleFilter(tag)}
              >
                <XIcon className="my-auto h-4 w-4" />
              </button>
            }
          />
        </li>
      ))}
    </ul>
  );
}
