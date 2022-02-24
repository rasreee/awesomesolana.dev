import { clsxm } from '@/ui/utils';

export const GhostButton = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & { disabled?: boolean }) => {
  return (
    <button
      className={clsxm(
        'text text-base font-semibold',
        'bg-transparent hover:font-bold active:bg-gray-300 disabled:text-gray-500 disabled:!opacity-80 dark:disabled:text-gray-400',
        'rounded-md px-12 py-2 transition-all',
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
