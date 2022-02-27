import { useGithubReposApi } from '@core/github';
import { Tag } from '@core/search';
import type { PaginationParams } from '@utils/pagination';
import React from 'react';

import { ErrorMessage } from '@/ui/components';

import { RepoItem } from './RepoItem';
import { ResultsInfo } from './ResultsInfo';

export type GithubApiParams = {
  tags?: Tag[];
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
      <ResultsInfo data={data} tags={params?.tags} />
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
