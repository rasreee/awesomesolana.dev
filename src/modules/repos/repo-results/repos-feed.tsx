import React from 'react';

import type { PaginationParams } from '@/lib/utils';
import { GithubRepo } from '@/modules/github';
import { Tag } from '@/modules/tags';

import { RepoFeedItem } from './repo-feed-item';
import { ReposResultsInfo } from './repos-results-info';

export type GithubApiParams = {
  tags?: Tag[];
  keywords?: string[];
} & Partial<PaginationParams>;

export type ReposFeedProps = {
  data: GithubRepo[];
  tags: GithubApiParams['tags'];
};

function ReposFeed({ data, tags }: ReposFeedProps) {
  return (
    <div>
      <ReposResultsInfo data={data} tags={tags} />
      <ul>
        {data.map((hit) => (
          <li key={hit.id}>
            <RepoFeedItem {...hit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReposFeed;
