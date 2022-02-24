import { FilterType, getFilterTypes } from '@/api/filters';
import clsxm from '@/ui/clsxm';

import { TagsMenu, useSearch } from '../search';

export function FilterCategories() {
  const { search } = useSearch();

  const tags = search.tags ?? [];

  const getCountForType = (type: FilterType): number => {
    return tags.filter((tag) => tag.type === type).length;
  };

  return (
    <>
      <ul
        className={clsxm(
          'flex items-center gap-2 overflow-x-auto',
          'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
        )}
      >
        {getFilterTypes()
          .sort((a, b) => getCountForType(b) - getCountForType(a))
          .map((type) => (
            <li key={type}>
              <TagsMenu type={type} />
            </li>
          ))}
      </ul>
    </>
  );
}
