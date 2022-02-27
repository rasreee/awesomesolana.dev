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
    return `Showing ${count} of ${totalCount} ${pluralize('result', count)}`;

  const result = count
    ? `${totalCount} ${pluralize('result', count)} found for:`
    : `No results found for:`;

  return result;
}

const MAX_TAGS_SHOWN = 3;

export function ReposResultsInfo({
  data,
  params,
}: {
  data: GithubReposResponse | undefined;
  params?: GithubApiParams | undefined;
}) {
  if (!data) return <div className="py-2 px-1">Loading...</div>;
  const remainingTagsCount = params?.tags
    ? params?.tags.length - MAX_TAGS_SHOWN
    : 0;
  const shouldShowTags = params?.tags && remainingTagsCount > 0;

  return (
    <div
      className={clsxm(
        'px-1 py-3',
        'flex flex-col justify-center gap-2 sm:flex-row sm:items-center sm:justify-start',
      )}
    >
      <span className="text-body text-sm leading-tight sm:text-base">
        {getReposResultsInfoText({
          count: data.items.length,
          totalCount: data.totalCount,
          params,
        })}
      </span>
      {shouldShowTags && (
        <div className="flex w-full items-center justify-between">
          <span className="flex max-w-[60%] items-center gap-1.5">
            {params?.tags?.slice(0, MAX_TAGS_SHOWN).map((filter) => (
              <Badge
                key={filter.type + '_' + filter.name}
                className={clsxm(
                  'text border border-green-500 bg-green-500 bg-opacity-10 text-green-500',
                  'h-5.5 rounded-full px-2.5 py-1',
                  'max-h-[24px] max-w-[140px]',
                )}
              >
                <span className="truncate text-sm leading-none">
                  {filter.name}
                </span>
              </Badge>
            ))}
          </span>
          {shouldShowTags && (
            <button
              className={clsxm(
                'text-[15px] leading-none',
                'flex h-6 min-w-[64px] items-center justify-center p-2',
                'bg-transparent font-medium',
                'text opacity-80 hover:opacity-90 active:opacity-100',
              )}
              onClick={() => console.log('')}
            >
              + {remainingTagsCount} more...
            </button>
          )}
        </div>
      )}
    </div>
  );
}
