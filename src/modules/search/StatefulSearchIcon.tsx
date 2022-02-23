import clsxm from '@/lib/clsxm';
import SearchIcon from '@/ui/icon/SearchIcon';
import Spinner from '@/ui/progress/Spinner';

export function StatefulSearchIcon({
  isRequesting,
}: {
  isRequesting: boolean;
}) {
  if (isRequesting) return <Spinner />;

  return (
    <label
      htmlFor="search"
      className={clsxm(
        'flex h-6 w-6 items-center justify-center',
        'text-base-600 dark:text-base-300',
      )}
    >
      <SearchIcon />
    </label>
  );
}
