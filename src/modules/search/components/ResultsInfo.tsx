import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { GitHubRepo } from '@/modules/github/types';
import { Tag } from '@/modules/tags';

function getResultsInfoText({
  hits,
  filters,
}: {
  hits: GitHubRepo[];
  filters: Tag[];
}): string {
  const hasFilters = Boolean(filters.length);

  if (!hasFilters)
    return `Showing ${hits.length} ${pluralize('result', hits.length)}`;

  const result = hits.length
    ? `Showing ${hits.length} ${pluralize('result', hits.length)} for `
    : `No results found for `;

  return result;
}

export function ResultsInfo({
  hits,
  filters,
}: {
  hits: GitHubRepo[] | undefined;
  filters: Tag[];
}) {
  if (!hits) return <div className="py-2 px-1">Loading...</div>;

  return (
    <div className={clsxm('py-2 px-1')}>
      <span className="text text-sm leading-none opacity-90">
        {getResultsInfoText({ hits, filters })}
      </span>
      {filters.map((filter) => `${filter.name}`)}
    </div>
  );
}
