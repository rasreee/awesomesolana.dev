import {
  GitPullRequestIcon,
  IssueOpenedIcon,
  RepoForkedIcon,
  StarIcon,
} from '@primer/octicons-react';
import clsx from 'clsx';

type AllowedType = 'stargazers' | 'forks' | 'issues' | 'pulls';

export type RepoStatProps = {
  type: AllowedType;
  count?: number | string;
  className?: string;
};

const iconMapping: Record<AllowedType, typeof StarIcon> = {
  stargazers: StarIcon,
  forks: RepoForkedIcon,
  issues: IssueOpenedIcon,
  pulls: GitPullRequestIcon,
};

function RepoStat({ type, count, className, ...props }: RepoStatProps) {
  if (count === undefined || count === null) {
    return null;
  }
  const Icon = iconMapping[type];

  return (
    <div
      {...props}
      className={clsx(
        'text-secondary hover:text-brand-primary whitespace-nowrap text-xs',
        className,
      )}
    >
      <Icon /> {count}
    </div>
  );
}

export default RepoStat;
