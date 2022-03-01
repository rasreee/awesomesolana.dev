import dynamic from 'next/dynamic';

import { useSearchQuery } from '@/contexts/search-query-context';
import { tagUtils } from '@/domains/tags/tags.utils';
import { TagType } from '@/domains/tags/types';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { capitalize } from '@/lib/string';

const ChevronDownIcon = dynamic(() => import('@/ui/icons/chevron-down-icon'));
const XIcon = dynamic(() => import('@/ui/icons/x-icon'));

function TagButton({
  children,
  className,
  ...props
}: {
  children: any;
  className?: string;
}) {
  return (
    <div
      className={clsxm(
        'cursor-pointer',
        'py-2 px-3 sm:gap-2 sm:px-4',
        'rounded-md',
        'flex items-center justify-between',
        'min-w-max overflow-hidden',
        'font-medium',
        'flex-1',
        'bg-surface-2 text text-opacity-90',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

const FilterTypeToggle = function FilterTypeToggle({
  type,
  isActive,
  onClick,
}: {
  type: TagType;
  isActive: boolean;
  onClick: () => void;
}) {
  const { tags, clearTags } = useSearchQuery();
  const selectedCount = tagUtils.list(tags).ofType(type).length;

  return (
    <TagButton
      className={clsxm(
        isActive || selectedCount ? 'bg-color-primary text-white' : '',
      )}
    >
      <div
        className="flex flex-1 cursor-pointer items-center gap-1.5"
        onClick={onClick}
      >
        <span className="text-left text-base leading-none">
          {capitalize(pluralize(type))}
        </span>
        {selectedCount > 0 && (
          <span className="text-base leading-none">{`(${selectedCount})`}</span>
        )}
      </div>
      {selectedCount ? (
        <button onClick={() => clearTags(type)}>
          <XIcon className="h-4 w-4" />
        </button>
      ) : (
        <button onClick={onClick}>
          <ChevronDownIcon />
        </button>
      )}
    </TagButton>
  );
};

export default FilterTypeToggle;
