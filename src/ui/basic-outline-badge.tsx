import clsxm from '@/lib/utils/clsxm';

import Badge from './badge';

const BasicOutlineBadge = ({ children, className, ...props }: any) => {
  return (
    <Badge
      className={clsxm(
        'text border border-basic-600 bg-basic-600 bg-opacity-10 text-basic-600',
        'h-5.5 rounded-full px-2.5 py-1',
        'max-h-[24px] max-w-[140px] sm:max-w-[180px]',
        className,
      )}
      {...props}
    >
      {children}
    </Badge>
  );
};

export default BasicOutlineBadge;
