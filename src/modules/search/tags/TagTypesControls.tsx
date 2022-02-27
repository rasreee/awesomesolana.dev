import { tagTypes } from '@core/tags';
import dynamic from 'next/dynamic';

const TagTypeToggle = dynamic(() => import('./TagTypeToggle'));

export function TagTypesControls() {
  return (
    <ul className="grid grid-cols-2 gap-2 overflow-x-auto sm:flex sm:items-center sm:gap-5">
      {tagTypes.map((name) => (
        <li key={name}>
          <TagTypeToggle type={name} />
        </li>
      ))}
    </ul>
  );
}
