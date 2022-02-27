import { GithubRepo } from '@core/github';
import { Tag } from '@core/search';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';

function getResultsInfoText({
  data,
  tags,
}: {
  data: GithubRepo[];
  tags?: Tag[];
}): string {
  const hasFilters = Boolean(tags?.length);

  if (!hasFilters)
    return `Showing ${data.length} ${pluralize('result', data.length)}`;

  const result = data.length
    ? `Showing ${data.length} ${pluralize('result', data.length)} for `
    : `No results found for `;

  return result;
}

export function ResultsInfo({
  data,
  tags,
}: {
  data: GithubRepo[] | undefined;
  tags?: Tag[];
}) {
  if (!data) return <div className="py-2 px-1">Loading...</div>;

  return (
    <div className={clsxm('py-2 px-1')}>
      <span className="text text-sm leading-none opacity-90">
        {getResultsInfoText({ data, tags })}
      </span>
      {tags?.map((filter) => `${filter.name}`)}
    </div>
  );
}
