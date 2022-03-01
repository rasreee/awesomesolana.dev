import { GithubReposApiParams } from '@awesomesolana/common';

import { useGithubReposApi } from '@/hooks/useGithubReposApi';
import { isApiError } from '@/lib/api';
import { ErrorMessage } from '@/ui/error-message';

import ReposList from '../common/repos-list';
import { ReposResultsInfo } from './repos-results-info';

export interface ReposFetchProps {
  route: '/search' | '/browse';
  params?: GithubReposApiParams;
}

const ReposFetch = function ReposFetch({ route, params }: ReposFetchProps) {
  const { data, error } = useGithubReposApi(route, params);

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>;

  if (isApiError(data))
    return <ErrorMessage>{JSON.stringify(data, null, 2)}</ErrorMessage>;

  return (
    <div>
      <ReposResultsInfo data={data} params={params} />
      <ReposList data={data} />
    </div>
  );
};

export default ReposFetch;
