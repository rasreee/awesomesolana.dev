import clsxm from '@utils/clsxm';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  disabled?: boolean;
};

const sharedClasses = clsxm(
  'rounded-md',
  'text-hase leading-none',
  'font-medium hover:font-semibold',
  'transition-all',
  'px-3 py-2',
  'disabled:!text-opacity-80 disabled:!opacity-70',
  'bg-opacity-70 hover:bg-opacity-80 active:bg-opacity-100',
);

export const PrimaryButton = ({
  children,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsxm(
        'bg-color-primary !bg-opacity-100 !text-white',
        sharedClasses,
        className,
      )}
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
        'text',
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
