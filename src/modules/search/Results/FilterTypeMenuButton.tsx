import { filtersByType, FilterType, toPluralFilterType } from '@/api/filters';
import { capitalizeFirst } from '@/common/utils';
import { useSearch } from '@/contexts/search';
import { SolidButton } from '@/ui/components';
import { PlusIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

export const FilterTypeMenuButton = ({
  type,
  onClick,
}: {
  type: FilterType;
  onClick: (type: FilterType) => void;
}) => {
  const { search } = useSearch();

  const count = filtersByType(search.tags ?? [], type).length;

  const handleClick = () => {
    onClick(type);
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
  );
};
