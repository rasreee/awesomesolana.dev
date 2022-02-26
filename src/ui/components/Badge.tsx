import clsxm from '@utils/clsxm';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={clsxm(
        'inline-flex items-center rounded bg-indigo-100 px-2 py-0.5 text-xs font-medium text-gray-800',
        className,
      )}
      {...props}
    >
      {children}
    </span>
  );
}

export function BadgeWithRemove({
  children,
  className,
  onRemoveClick,
  ...props
}: BadgeProps & { onRemoveClick: () => void }) {
  return (
    <span
      className={clsxm(
        'inline-flex items-center rounded-full bg-indigo-100 py-0.5 pl-2.5 pr-1 text-sm font-medium text-indigo-700',
        className,
      )}
      {...props}
    >
      {children}
      <button
        type="button"
        className="ml-0.5 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:bg-indigo-500 focus:text-white focus:outline-none"
        onClick={onRemoveClick}
      >
        <span className="sr-only">Remove option</span>
        <svg
          className="h-2 w-2"
          stroke="currentColor"
          fill="none"
          viewBox="0 0 8 8"
        >
          <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
        </svg>
      </button>
    </span>
  );
}
