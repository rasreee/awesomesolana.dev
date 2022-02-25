import React from 'react';

import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { GitHubRepo } from '@/modules/github';
import {
  useBrowseGithubRepos,
  useSearchGithubRepos,
} from '@/modules/github/useGithubReposApi';
import { useSearchState } from '@/modules/search';
import { Tag } from '@/modules/tags';
import { ErrorMessage } from '@/ui/components';

import { RepoItem } from './RepoItem';

export function SearchResults() {
  const { filters, query } = useSearchState();

  const { data, error } = useSearchGithubRepos({
    filters,
    q: query,
  });

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>;

  if (!data) return <ul>...</ul>;

  return (
    <div>
      <ResultsInfo data={data} filters={filters} />
      <ul>
        {data.map((hit) => (
          <li key={hit.id}>
            <RepoItem {...hit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BrowseResults() {
  const { data, error } = useBrowseGithubRepos();

  if (error) return <ErrorMessage>{error?.message}</ErrorMessage>;

  if (!data) return <ul>...</ul>;

  return (
    <div>
      <ResultsInfo data={data} />
      <ul>
        {data.map((hit) => (
          <li key={hit.id}>
            <RepoItem {...hit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function getResultsInfoText({
  data,
  filters,
}: {
  data: GitHubRepo[];
  filters?: Tag[];
}): string {
  const hasFilters = Boolean(filters?.length);

  if (!hasFilters)
    return `Showing ${data.length} ${pluralize('result', data.length)}`;

  const result = data.length
    ? `Showing ${data.length} ${pluralize('result', data.length)} for `
    : `No results found for `;

  return result;
}

function ResultsInfo({
  data,
  filters,
}: {
  data: GitHubRepo[] | undefined;
  filters?: Tag[];
}) {
  if (!data) return <div className="py-2 px-1">Loading...</div>;

  return (
    <div className={clsxm('py-2 px-1')}>
      <span className="text text-sm leading-none opacity-90">
        {getResultsInfoText({ data, filters })}
      </span>
      {filters?.map((filter) => `${filter.name}`)}
    </div>
  );
}
