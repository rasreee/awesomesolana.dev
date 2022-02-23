import { FilterType, getFilterTypes } from '@/api/filters';

import { useSearch } from './SearchContext';
import { TagsMenu } from './TagsMenu';

export function MobileFilterBar() {
  const { search } = useSearch();

  const tags = search.tags ?? [];

  const getCountForType = (type: FilterType): number => {
    return tags.filter((tag) => tag.type === type).length;
  };

  return (
    <>
      <ul className="flex items-center gap-2 overflow-x-auto">
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
