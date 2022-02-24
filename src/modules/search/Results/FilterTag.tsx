import { SearchFilter } from '@/api/filters';
import clsxm from '@/ui/clsxm';
import { XIcon } from '@/ui/icons';

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
  onClick?: () => void;
}) {
  return (
    <button
      className={clsxm(
        'py-0.5 px-2.5',
        'rounded-md',
        'flex items-center justify-between gap-1',
        'text w-max max-w-[11rem] overflow-hidden',

        isActive
          ? 'bg-indigo-600 font-medium'
          : 'bg-surface-2 text text-opacity-90',
        className,
      )}
      onClick={onClick}
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
