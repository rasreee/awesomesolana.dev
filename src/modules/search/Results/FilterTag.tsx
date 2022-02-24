import { SearchFilter } from '@/api/filters';
import { XIcon } from '@/ui/icons';
import { clsxm } from '@/ui/utils';

export function FilterTag({
  tag,
  onClickRemove,
  className,
  isActive,
  onClick,
}: {
  tag: SearchFilter;
  onClickRemove?: () => void;
  className?: string;
  isActive?: boolean;
  onClick: (tag: SearchFilter) => void;
}) {
  const handleClick = () => onClick(tag);

  return (
    <button
      className={clsxm(
        'py-0.5 px-2.5',
        'rounded-md',
        'flex items-center justify-between gap-1',
        'w-max max-w-[11rem] overflow-hidden',
        'font-medium',
        'flex-1',
        isActive
          ? 'bg-color-primary text-white'
          : 'bg-surface-2 text text-opacity-90',
        className,
      )}
      onClick={handleClick}
    >
      <span
        className={clsxm(isActive && 'text-white', 'text truncate text-sm')}
      >
        {tag.name}
      </span>
      {onClickRemove && (
        <button
          className="px-1 opacity-60 hover:opacity-80 active:opacity-100"
          onClick={onClickRemove}
        >
          <XIcon className="my-auto h-4 w-4" />
        </button>
      )}
    </button>
  );
}
