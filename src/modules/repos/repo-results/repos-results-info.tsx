import clsxm from '@/lib/utils/clsxm';
import pluralize from '@/lib/utils/pluralize';
import { GithubApiParams, GithubReposResponse } from '@/modules/github';

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
    return `Showing ${count} ${pluralize('result', count)} of ${totalCount}`;

  const result = count
    ? `Showing ${count} of ${totalCount} ${pluralize('result', count)} for `
    : `No results found for `;

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
    <div className={clsxm('py-2 px-1')}>
      <span className="text text-sm leading-none opacity-90">
        {getReposResultsInfoText({
          count: data.items.length,
          totalCount: data.totalCount,
          params,
        })}
      </span>
      {params?.tags?.map((filter) => `${filter.name}`)}
    </div>
  );
}
