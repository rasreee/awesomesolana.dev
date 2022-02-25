import React from 'react';

import { useSearch } from '@/contexts/SearchContext';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';

import { GitHubRepo } from '../../github/types';
import { Tag } from '../../tags';
import { RepoItem } from '.';

export function Results() {
  const { results } = useSearch();

  if (!results) return <ul>...</ul>;

  return (
    <div>
      <ResultsInfo />
      <ul>
        {results.map((hit) => (
          <li key={hit.id}>
            <RepoItem {...hit} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function getResultsInfoText({
  results,
  filters,
}: {
  results: GitHubRepo[];
  filters: Tag[];
}): string {
  const hasFilters = Boolean(filters.length);

  if (!hasFilters)
    return `Showing ${results.length} ${pluralize('result', results.length)}`;

  const result = results.length
    ? `Showing ${results.length} ${pluralize('result', results.length)} for `
    : `No results found for `;

  return result;
}

function ResultsInfo() {
  const { results, filters } = useSearch();

  if (!results) return <div className="py-2 px-1">Loading...</div>;

  return (
    <div className={clsxm('py-2 px-1')}>
      <span className="text text-sm leading-none opacity-90">
        {getResultsInfoText({ results, filters })}
      </span>
      {filters.map((filter) => `${filter.name}`)}
    </div>
  );
}
