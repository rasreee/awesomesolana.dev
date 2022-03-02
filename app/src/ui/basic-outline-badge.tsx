import { clsxm } from '@awesomesolana/tw';

import Badge from './badge';

const BasicOutlineBadge = ({ children, className, ...props }: any) => {
  return (
    <Badge
      className={clsxm(
        'text border border-basic-600 text-basic-600 dark:bg-basic-600 dark:bg-opacity-10',
        'h-5.5 rounded-full px-2.5 py-1',
        'max-h-[24px] max-w-[180px] sm:max-w-[200px]',
        className,
      )}
      {...props}
    >
      {children}
    </Badge>
  );
};

export default BasicOutlineBadge;
