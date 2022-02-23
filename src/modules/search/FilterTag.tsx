import { ContentTag } from '@/data/tags';
import clsxm from '@/lib/clsxm';
import { XIcon } from '@/ui/icon/XIcon';

export function FilterTag({
  tag,
  onClickRemove,
  className,
  isActive,
}: {
  tag: ContentTag;
  onClickRemove?: () => void;
  className?: string;
  isActive?: boolean;
}) {
  return (
    <div
      className={clsxm(
        'py-0.5 px-2.5',
        'rounded-md',
        'flex items-center justify-between gap-1',
        'w-max max-w-[11rem] overflow-hidden',

        className,
        isActive ? 'bg-surface-1 font-medium' : 'bg-surface bg-opacity-80',
      )}
    >
      <span className="truncate text-sm">{tag.name}</span>
      {onClickRemove && (
        <button
          className="px-1 opacity-60 hover:opacity-80 active:opacity-100"
          onClick={onClickRemove}
        >
          <XIcon className="my-auto h-4 w-4" />
        </button>
      )}
    </div>
  );
}
