import dynamic from 'next/dynamic';
import React from 'react';

import { GithubRepo } from '@/modules/github';

const RepoStat = dynamic(() => import('@/ui/github/repo-stat'));
const BasicOutlineBadge = dynamic(() => import('@/ui/basic-outline-badge'));

export function RepoFeedItem({
  name,
  description,
  topics,
  starsCount,
}: GithubRepo) {
  return (
    <div className="flex flex-col gap-2 py-3">
      <div className="text-xl font-semibold">{name}</div>
      <div className="text-base">{description}</div>
      <div className="flex items-center gap-2">
        <ul className="flex flex-wrap items-center gap-1.5">
          {topics.map((topic) => (
            <li key={`${topic}`}>
              <BasicOutlineBadge>{topic}</BasicOutlineBadge>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-wrap items-center gap-1.5">
        <li>
          <RepoStat type="stargazers" count={starsCount} />
        </li>
      </ul>
    </div>
  );
}
