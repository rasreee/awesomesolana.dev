import dynamic from 'next/dynamic';

import { tagTypes } from '@/domains/tags/tags.constants';

const FilterTypeToggle = dynamic(() => import('./filter-type-toggle'));

export function FiltersPanel() {
  return (
    <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
      {tagTypes.map((name) => (
        <li key={name}>
          <FilterTypeToggle type={name} />
        </li>
      ))}
    </ul>
  );
}
