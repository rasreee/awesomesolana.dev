import clsxm from '@utils/clsxm';

import { SVGIconProps } from '@/ui/icons/types';

import { Spinner } from './Spinner';

type StatefulIconProps = SVGIconProps & {
  loading: boolean;
  icon: React.ComponentType<SVGIconProps>;
  label: string;
};

export function StatefulIcon({
  loading,
  className,
  icon: Icon,
  label,
  ...props
}: StatefulIconProps) {
  if (loading) return <Spinner />;

  return (
    <label htmlFor={label} className={clsxm('h-5 w-5', className)}>
      <Icon {...props} className={clsxm('h-5 w-5', className)} />
    </label>
  );
}
