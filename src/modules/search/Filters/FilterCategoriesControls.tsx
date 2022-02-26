import { FILTER_CATEGORIES } from '@modules/tags';

import { FilterItemToggle } from './FilterItemToggle';

export function FilterCategoriesControls() {
  return (
    <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
      {FILTER_CATEGORIES.map((name) => (
        <li key={name}>
          <FilterItemToggle category={name} />
        </li>
      ))}
    </ul>
  );
}
