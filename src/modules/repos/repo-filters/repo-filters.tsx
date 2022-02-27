import dynamic from 'next/dynamic';

import { tagTypes } from '@/modules/tags';

const RepoFilterTypeButton = dynamic(() => import('./repo-filter-type-button'));

export function RepoFilters() {
  return (
    <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
      {tagTypes.map((name) => (
        <li key={name}>
          <RepoFilterTypeButton type={name} />
        </li>
      ))}
    </ul>
  );
}
