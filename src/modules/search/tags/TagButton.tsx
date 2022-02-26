import clsxm from '@utils/clsxm';

export function TagButton({
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
