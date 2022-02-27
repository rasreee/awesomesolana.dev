import dynamic from 'next/dynamic';
import React from 'react';

import clsxm from '@/lib/utils/clsxm';
import { GithubRepo } from '@/modules/github';

const RepoStat = dynamic(() => import('@/ui/github/repo-stat'));
const BasicOutlineBadge = dynamic(() => import('@/ui/basic-outline-badge'));

const MAX_TOPICS_SHOWN = 5;

export function RepoFeedItem({
  name,
  description,
  topics,
  starsCount,
}: GithubRepo) {
  const shouldShowRemainingTopicsInfo = topics.length - MAX_TOPICS_SHOWN > 0;
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
        <div className="flex items-center gap-2">
          <ul className="flex flex-wrap items-center gap-1.5">
            {topics.slice(0, MAX_TOPICS_SHOWN).map((topic) => (
              <li key={`${topic}`}>
                <BasicOutlineBadge>{topic}</BasicOutlineBadge>
              </li>
            ))}
          </ul>
          {shouldShowRemainingTopicsInfo && (
            <button
              className={clsxm(
                'text-sm leading-none',
                'flex h-6 min-w-[64px] items-center justify-center p-2',
                'bg-transparent font-medium',
                'text opacity-60 hover:font-semibold hover:opacity-80 active:opacity-100',
                'transition-all',
              )}
            >
              + {topics.length - MAX_TOPICS_SHOWN} more...
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
