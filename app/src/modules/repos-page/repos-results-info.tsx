import { GithubReposApiParams } from '@awesomesolana/common';

import { GithubReposData } from '@/domains/github';
import { Tag } from '@/domains/tags/types';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import Badge from '@/ui/badge';
import { useBreakpoints } from '@/ui/responsive';

function getReposResultsInfoText({
  count,
  params,
  totalCount,
}: {
  count: number;
  params: GithubReposApiParams | undefined;
  totalCount: number;
}): string {
  if (!params?.tags?.length)
    return `Showing ${count} of ${totalCount} ${pluralize('result', count)}`;

  const result = count
    ? `${totalCount} ${pluralize('result', count)} found for:`
    : `No results found for:`;

  return result;
}

export function ReposResultsInfo({
  data,
  params,
}: {
  data: GithubReposData | undefined;
  params?: GithubReposApiParams | undefined;
}) {
  const breakpoints = useBreakpoints();
  if (!data || !breakpoints) return <div className="py-2 px-1">Loading...</div>;

  const maxTagsToShow = breakpoints.isSmall ? 3 : 5;

  const remainingTagsCount = params?.tags
    ? params?.tags.length - maxTagsToShow
    : 0;

  const shouldShowRemainingTagsInfo = remainingTagsCount > 0;

  return (
    <div className={clsxm('flex flex-col justify-center gap-2')}>
      <span className="text-body text-sm leading-tight sm:text-base">
        {getReposResultsInfoText({
          count: data.items.length,
          totalCount: data.totalCount,
          params,
        })}
      </span>
      <div className="flex w-full items-center gap-2">
        <Tags tags={params?.tags} max={maxTagsToShow} />
        {shouldShowRemainingTagsInfo && (
          <button
            className={clsxm(
              'text-[15px] leading-none',
              'flex h-6 min-w-[64px] items-center justify-center p-2',
              'bg-transparent font-semibold',
              'text opacity-70 hover:font-bold hover:opacity-90 active:opacity-100',
              'transition-all',
            )}
            onClick={() => console.log('')}
          >
            + {remainingTagsCount} more...
          </button>
        )}
      </div>
    </div>
  );
}

const Tags = ({ tags, max }: { tags: Tag[] | undefined; max: number }) => {
  if (!tags?.length) return null;

  return (
    <span className="flex max-w-[60%] items-center gap-1.5">
      {tags.slice(0, max).map((filter) => (
        <Badge
          key={filter.type + '_' + filter.name}
          className={clsxm(
            'text border border-green-500 bg-green-500 bg-opacity-10 text-green-500',
            'h-5.5 rounded-full px-2.5 py-1',
            'max-h-[24px] max-w-[140px] sm:max-w-[180px]',
          )}
        >
          {filter.name}
        </Badge>
      ))}
    </span>
  );
};
