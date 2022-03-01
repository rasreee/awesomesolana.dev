import { GithubApiParams } from '@/domains/github';
import { useGithubReposApi } from '@/hooks/useGithubReposApi';
import { isApiError } from '@/lib/api';
import { ErrorMessage } from '@/ui/error-message';
import FeedSkeleton from '@/ui/feed-skeleton';

import ReposFeed from '../common/repos-feed';
import { ReposResultsInfo } from './repos-results-info';

export interface ReposFetchProps {
  route: '/search' | '/browse';
  params?: GithubApiParams;
}

const ReposFetch = function ReposFetch({ route, params }: ReposFetchProps) {
  const { data, error } = useGithubReposApi(route, params);

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>;

  if (isApiError(data))
    return <ErrorMessage>{JSON.stringify(data, null, 2)}</ErrorMessage>;

  if (!data) return <FeedSkeleton n={10} />;

  return (
    <div>
      <ReposResultsInfo data={data} params={params} />
      <ReposFeed data={data} />
    </div>
  );
};

export default ReposFetch;
