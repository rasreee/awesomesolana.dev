import React from 'react';

import { GitHubRepo } from '@/modules/github/types';

import { RepoItem } from './RepoItem';
import { ResultsInfo } from './ResultsInfo';

export function Results({ hits }: { hits: GitHubRepo[] | undefined }) {
  if (!hits) return <div>Loading...</div>;

  return (
    <div>
      <ResultsInfo hits={hits} />
      <ul>
        {hits.map((hit) => (
          <li key={hit.id}>
            <RepoItem {...hit} />
            {JSON.stringify(hit)}
          </li>
        ))}
      </ul>
    </div>
  );
}
