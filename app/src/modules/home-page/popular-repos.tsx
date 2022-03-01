import useSWR from 'swr';

import { GithubRepo } from '@/domains/github';
import { SourceType } from '@/domains/sources/definitions';
import { ApiData, isApiError } from '@/lib/api';
import classed from '@/lib/classed';
import { ErrorMessage } from '@/ui/error-message';
import FeedSkeleton from '@/ui/feed-skeleton';

const FeedList = classed(
  'ul',
  'flex flex-col divide-y divide-base-300 dark:divide-base-700',
);

const PopularRepos = () => {
  const { data, error } = useSWR<ApiData<GithubRepo[]>, Error>(
    `/api/sources/popular?type=${SourceType.Repo}`,
  );

  if (!data) return <FeedSkeleton n={5} />;

  if (error) return <ErrorMessage>{error.message}</ErrorMessage>;

  if (isApiError(data)) return <ErrorMessage>{data.message}</ErrorMessage>;

  return (
    <FeedList>
      {data.map((hit) => (
        <li key={hit.id}>{JSON.stringify(hit, null, 2)}</li>
      ))}
    </FeedList>
  );
};

export default PopularRepos;
