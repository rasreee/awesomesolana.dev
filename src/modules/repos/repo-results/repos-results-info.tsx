import clsxm from '@/lib/utils/clsxm';
import pluralize from '@/lib/utils/pluralize';
import { GithubApiParams, GithubReposResponse } from '@/modules/github';
import Badge from '@/ui/badge';

function getReposResultsInfoText({
  count,
  params,
  totalCount,
}: {
  count: number;
  params: GithubApiParams | undefined;
  totalCount: number;
}): string {
  if (!params?.tags?.length)
    return `${totalCount} ${pluralize('result', count)} found`;

  const result = count
    ? `${totalCount} ${pluralize('result', count)} found for:`
    : `No results found for:`;

  return result;
}

export function ReposResultsInfo({
  data,
  params,
}: {
  data: GithubReposResponse | undefined;
  params?: GithubApiParams | undefined;
}) {
  if (!data) return <div className="py-2 px-1">Loading...</div>;

  return (
    <div className={clsxm('py-2 px-1', 'flex items-center gap-2')}>
      <span className="text text-base leading-none opacity-80">
        {getReposResultsInfoText({
          count: data.items.length,
          totalCount: data.totalCount,
          params,
        })}
      </span>
      <span className="flex items-center gap-2">
        {params?.tags?.map((filter) => (
          <Badge
            key={filter.type + '_' + filter.name}
            className={clsxm(
              'text text-sm leading-none',
              'text border border-green-500 bg-green-500 bg-opacity-10 text-green-500',
              'h-5.5 rounded-full px-2.5 py-1',
              'flex items-center justify-center',
            )}
          >
            {filter.name}
          </Badge>
        ))}
      </span>
    </div>
  );
}
