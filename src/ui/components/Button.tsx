import { clsxm } from '@/ui/utils';

export type ButtonProps = React.HTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

const sharedClasses = clsxm(
  'rounded-md',
  'font-semibold hover:font-bold leading-none',
  'transition-all',
  'px-3 py-2',
  'disabled:!text-opacity-80 disabled:!opacity-70',
);

export const PrimaryButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsxm('bg-color-primary text-white', sharedClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const GhostButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsxm(
        'text text-base',
        'bg-transparent active:bg-gray-300 disabled:text-gray-500 dark:disabled:text-gray-400',
        sharedClasses,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export const SolidButton = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsxm('text', 'bg-surface-2', sharedClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
};
