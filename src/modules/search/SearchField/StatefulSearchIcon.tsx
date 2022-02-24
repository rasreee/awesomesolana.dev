import clsxm from '@/ui/clsxm';
import { Spinner } from '@/ui/components';
import { SearchIcon } from '@/ui/icons';

export function StatefulSearchIcon({
  isRequesting,
  className,
}: {
  isRequesting: boolean;
  className?: string;
}) {
  if (isRequesting) return <Spinner />;

  return (
    <label
      htmlFor="search"
      className={clsxm('flex h-6 w-6 items-center justify-center', className)}
    >
      <SearchIcon />
    </label>
  );
}
