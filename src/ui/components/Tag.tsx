import clsxm from '@/lib/clsxm';

function XIcon({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={clsxm('h-5 w-5', className)}
      viewBox="0 0 20 20"
      fill="currentColor"
      {...props}
    >
      <path
        fillRule="evenodd"
        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export interface TagProps extends React.HTMLAttributes<HTMLDivElement> {
  onClickRemove: () => void;
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
        'py-1.5 pr-1.5 pl-2.5',
        'rounded-2xl',
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
      <button
        className="px-1 opacity-60 hover:opacity-80 active:opacity-100"
        onClick={onClickRemove}
      >
        <XIcon className="my-auto h-4 w-4" />
      </button>
    </div>
  );
}
