import React from 'react';

import { GithubReposResponse } from '@/domains/github';

import { RepoFeedItem } from './repo-feed-item';

export type ReposFeedProps = {
  data: GithubReposResponse;
};

function ReposFeed({ data }: ReposFeedProps) {
  return (
    <ul className="flex flex-col divide-y divide-base-300 dark:divide-base-700">
      {data.items.map((hit) => (
        <li key={hit.id}>
          <RepoFeedItem {...hit} />
        </li>
      ))}
    </ul>
  );
}

export default ReposFeed;
