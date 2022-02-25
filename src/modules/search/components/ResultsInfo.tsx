import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { GitHubRepo } from '@/modules/github';
import { Tag } from '@/modules/tags';

function getResultsInfoText({
  data,
  filters,
}: {
  data: GitHubRepo[];
  filters?: Tag[];
}): string {
  const hasFilters = Boolean(filters?.length);

  if (!hasFilters)
    return `Showing ${data.length} ${pluralize('result', data.length)}`;

  const result = data.length
    ? `Showing ${data.length} ${pluralize('result', data.length)} for `
    : `No results found for `;

  return result;
}

export function ResultsInfo({
  data,
  filters,
}: {
  data: GitHubRepo[] | undefined;
  filters?: Tag[];
}) {
  if (!data) return <div className="py-2 px-1">Loading...</div>;

  return (
    <div className={clsxm('py-2 px-1')}>
      <span className="text text-sm leading-none opacity-90">
        {getResultsInfoText({ data, filters })}
      </span>
      {filters?.map((filter) => `${filter.name}`)}
    </div>
  );
}
