import React from 'react';

import { GithubReposResponse } from '@/modules/github';

import { RepoFeedItem } from './repo-feed-item';

export type ReposFeedProps = {
  data: GithubReposResponse;
};

function ReposFeed({ data }: ReposFeedProps) {
  return (
    <div>
      <ul>
        {data.items.map((hit) => (
          <li key={hit.id}>
            <RepoFeedItem {...hit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReposFeed;
