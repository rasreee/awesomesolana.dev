import { FeedSkeleton } from '@awesomesolana/ui';
import React from 'react';

import { GithubReposData } from '@/domains/github';

import { RepoFeedItem } from './repo-feed-item';

export type ReposListProps = {
  data: GithubReposData | undefined;
};

function ReposList({ data }: ReposListProps) {
  if (!data) return <FeedSkeleton n={8} />;

  return (
    <ul className="flex flex-col divide-y divide-base-300 dark:divide-base-700">
      {data.items.map((hit) => (
        <li key={hit.id} className="m-0 p-0">
          <RepoFeedItem {...hit} />
        </li>
      ))}
    </ul>
  );
}

export default ReposList;
