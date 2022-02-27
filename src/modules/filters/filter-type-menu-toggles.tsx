import dynamic from 'next/dynamic';

import { tagTypes } from '@/modules/tags';

const FilterTypeMenuToggle = dynamic(() => import('./filter-type-menu-toggle'));

export function FilterTypeMenuToggles() {
  return (
    <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
      {tagTypes.map((name) => (
        <li key={name}>
          <FilterTypeMenuToggle type={name} />
        </li>
      ))}
    </ul>
  );
}
