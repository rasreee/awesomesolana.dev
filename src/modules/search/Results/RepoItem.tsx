import { GitHubRepo } from '@modules/github';
import React from 'react';

import { Badge, RepoStat } from '@/ui/components';

export function RepoItem({
  name,
  description,
  topics,
  starsCount,
}: GitHubRepo) {
  return (
    <div className="bg-surface rounded bg-opacity-70">
      <div className="flex flex-col gap-2 px-3 py-3">
        <div className="text-xl font-semibold">{name}</div>
        <div className="text-base">{description}</div>
        <ul className="flex flex-wrap items-center gap-1.5">
          <li>
            <RepoStat type="stargazers" count={starsCount} />
          </li>
        </ul>
        <ul className="flex flex-wrap items-center gap-1.5">
          {topics.map((topic) => (
            <li key={`${topic}`}>
              <Badge>{topic}</Badge>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
