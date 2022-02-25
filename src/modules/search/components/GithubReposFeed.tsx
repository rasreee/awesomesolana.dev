import React from 'react';

import { PaginationParams } from '@/common/utils';
import { useGithubReposApi } from '@/modules/github';
import { Tag } from '@/modules/tags';
import { ErrorMessage } from '@/ui/components';

import { RepoItem } from './RepoItem';
import { ResultsInfo } from './ResultsInfo';

export type GithubApiParams = {
  filters?: Tag[];
  keywords?: string[];
} & Partial<PaginationParams>;

export type GithubReposProps = {
  route: '/search' | '/browse';
  params?: GithubApiParams;
};

export function GithubReposFeed({ route, params }: GithubReposProps) {
  const { data, error } = useGithubReposApi(route, params);

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>;

  if (!data) return <ul>...</ul>;

  return (
    <div>
      <ResultsInfo data={data} filters={params?.filters} />
      <ul>
        {data.map((hit) => (
          <li key={hit.id}>
            <RepoItem {...hit} />
          </li>
        ))}
      </ul>
    </div>
  );
}
