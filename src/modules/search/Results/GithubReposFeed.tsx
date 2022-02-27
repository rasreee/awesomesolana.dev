import { GithubRepo } from '@core/github';
import { Tag } from '@core/tags';
import type { PaginationParams } from '@utils/pagination';
import React from 'react';

import { RepoItem } from './RepoItem';
import { ResultsInfo } from './ResultsInfo';

export type GithubApiParams = {
  tags?: Tag[];
  keywords?: string[];
} & Partial<PaginationParams>;

export type GithubReposProps = {
  data: GithubRepo[];
  tags: GithubApiParams['tags'];
};

function GithubReposFeed({ data, tags }: GithubReposProps) {
  return (
    <div>
      <ResultsInfo data={data} tags={tags} />
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

export default GithubReposFeed;
