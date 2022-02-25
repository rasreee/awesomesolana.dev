import { Tag } from '@/api/tags';
import clsxm from '@/lib/clsxm';
import { XIcon } from '@/ui/icons';

export function FilterTag({
  tag,
  onRemove,
  className,
  isActive,
  onToggle,
}: {
  tag: Tag;
  onRemove?: (tag: Tag) => void;
  className?: string;
  isActive?: boolean;
  onToggle?: (tag: Tag) => void;
}) {
  const handleClick = () => onToggle && onToggle(tag);
  const handleRemove = () => onRemove && onRemove(tag);

  return (
    <button
      className={clsxm(
        'py-0.5 px-2.5',
        'rounded-md',
        'flex items-center justify-between gap-1',
        'w-max max-w-[14rem] overflow-hidden',
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
      {onRemove && (
        <button
          className="px-1 opacity-60 hover:opacity-80 active:opacity-100"
          onClick={handleRemove}
        >
          <XIcon className="my-auto h-4 w-4" />
        </button>
      )}
    </button>
  );
}
