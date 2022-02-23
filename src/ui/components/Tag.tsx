import clsxm from '@/lib/clsxm';
import { XIcon } from '@/ui/icon/XIcon';

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  onClickRemove?: () => void;
}

export function Tag({
  children,
  className,
  onClickRemove,
  ...props
}: TagProps) {
  return (
    <div
      {...props}
      className={clsxm(
        'bg-surface-1',
        'py-1 pl-2.5',
        onClickRemove ? 'pr-1.5' : 'pr-2.5',
        'rounded-lg',
        'flex items-center justify-between gap-1',
        'min-w-max max-w-min',
        className,
      )}
    >
      <span
        className={clsxm(
          'truncate',
          'mb-0.5 text-sm font-medium leading-none sm:text-base',
        )}
      >
        {children}
      </span>
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
