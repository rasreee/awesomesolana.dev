import clsxm from '@utils/clsxm';

export type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

function Badge({ children, className, ...props }: BadgeProps) {
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

export default Badge;
