import { FilterType, getFilterTypes } from '@/api/filters';
import clsxm from '@/ui/clsxm';

import { useSearch } from '../SearchContext';
import { TagsMenu } from '../TagsMenu';

export function MobileFilterBar({ className }: { className?: string }) {
  const { search } = useSearch();

  const tags = search.tags ?? [];

  const getCountForType = (type: FilterType): number => {
    return tags.filter((tag) => tag.type === type).length;
  };

  return (
    <>
      <ul
        className={clsxm('flex items-center gap-2 overflow-x-auto', className)}
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
