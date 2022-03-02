import { isApiError } from '@awesomesolana/common';
import { Tag } from '@awesomesolana/common';
import { ErrorMessage } from '@awesomesolana/ui';

import { useGithubReposApi } from '@/hooks/useGithubReposApi';

import ReposList from '../common/repos-list';

export interface ReposFetchProps {
  route: '/search' | '/browse';
  params: { tags?: Tag[]; term?: string; page: number; per_page: number };
}

const ReposFetch = function ReposFetch({ route, params }: ReposFetchProps) {
  const { data, error } = useGithubReposApi(route, params);

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>;

  if (isApiError(data))
    return <ErrorMessage>{JSON.stringify(data, null, 2)}</ErrorMessage>;

  return <ReposList data={data} />;
};

export default ReposFetch;
