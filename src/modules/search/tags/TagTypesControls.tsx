import { TAG_TYPES } from '@api/tags';

import { TagTypeToggle } from './TagTypeToggle';

export function TagTypesControls() {
  return (
    <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
      {TAG_TYPES.map((name) => (
        <li key={name}>
          <TagTypeToggle type={name} />
        </li>
      ))}
    </ul>
  );
}
