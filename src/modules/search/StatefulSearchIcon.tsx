import clsxm from '@/lib/clsxm';
import SearchIcon from '@/ui/icon/SearchIcon';
import Spinner from '@/ui/progress/Spinner';

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
