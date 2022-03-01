import { TagType } from '@awesomesolana/common';
import { tagTypes } from '@awesomesolana/common';

import FilterTypeToggle from './filter-type-toggle';
function FiltersBar({
  onSelect,
  getIsActiveItem,
}: {
  onSelect: (item: TagType) => void;
  getIsActiveItem: (item: TagType) => boolean;
}) {
  const handleClick = (tagType: TagType) => () => onSelect(tagType);

  return (
    <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
      {tagTypes.map((name) => (
        <li key={name}>
          <FilterTypeToggle
            type={name}
            isActive={getIsActiveItem(name)}
            onClick={handleClick(name)}
          />
        </li>
      ))}
    </ul>
  );
}

export default FiltersBar;
