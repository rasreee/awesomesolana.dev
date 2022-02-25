import {
  FilterCategory,
  filtersByType,
  toPluralFilterCategory,
} from '@/api/filters';
import { capitalizeFirst } from '@/common/utils';
import { useSearch } from '@/contexts/search';
import { SolidButton } from '@/ui/components';
import { PlusIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

export const FilterCategoryMenuButton = ({
  category,
  onClick,
}: {
  category: FilterCategory;
  onClick: (category: FilterCategory) => void;
}) => {
  const { search } = useSearch();

  const count = filtersByType(search.tags ?? [], category).length;

  const handleClick = () => {
    onClick(category);
  };

  return (
    <SolidButton
      onClick={handleClick}
      className={clsxm(
        'flex max-w-min items-center justify-between gap-2',
        'relative',
      )}
    >
      <span className="max-w-[9rem] truncate text-sm leading-none md:max-w-[10rem]">
        {capitalizeFirst(toPluralFilterCategory(category))}
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
  );
};
