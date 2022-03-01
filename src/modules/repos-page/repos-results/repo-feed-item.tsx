import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import intlFormat from 'date-fns/intlFormat';
import dynamic from 'next/dynamic';
import React from 'react';

import { GithubRepo } from '@/domains/github';
import clsxm from '@/lib/clsxm';
import { Anchor } from '@/ui/anchor';

const RepoStat = dynamic(() => import('@/ui/github/repo-stat'));
const BasicOutlineBadge = dynamic(() => import('@/ui/basic-outline-badge'));

export function RepoFeedItem({
  name,
  description,
  topics,
  starsCount,
  updatedAt,
  language,
  htmlUrl,
}: GithubRepo) {
  return (
    <div className="flex flex-col gap-2 py-3">
      <Anchor
        external
        className={clsxm(
          'max-w-max',
          'hover:text-green-500 dark:hover:text-primary-500',
          'heading text-xl',
        )}
        href={htmlUrl}
      >
        {name}
      </Anchor>
      <div className="prose prose-sm dark:prose-invert">{description}</div>
      <div className="flex items-center gap-2">
        <ul className="flex flex-wrap items-center gap-1.5">
          {topics.map((topic) => (
            <li key={`${topic}`}>
              <BasicOutlineBadge>{topic}</BasicOutlineBadge>
            </li>
          ))}
        </ul>
      </div>
      <ul className="flex flex-wrap items-center gap-2">
        <li>
          <RepoStat type="stargazers" count={starsCount} />
        </li>
        <li>
          <div className="flex text-xs">
            <span className="mr-2 block h-3 w-3 rounded-full">
              <style jsx>{`
                span {
                  background-color: ${language};
                }
              `}</style>
            </span>
            <span>{language}</span>
          </div>
        </li>
        <li>
          <UpdatedAt updatedAt={updatedAt} />
        </li>
      </ul>
    </div>
  );
}

export const UpdatedAt = ({ updatedAt }: { updatedAt: string }) => {
  return (
    <div
      className="text-hint text-xs"
      title={intlFormat(
        new Date(updatedAt),
        {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          timeZoneName: 'short',
        },
        {
          locale: 'en-US',
        },
      )}
    >
      <span>
        Updated{' '}
        {formatDistanceToNowStrict(new Date(updatedAt), {
          addSuffix: true,
        })}
      </span>
    </div>
  );
};
