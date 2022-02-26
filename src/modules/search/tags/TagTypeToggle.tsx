import { getTags, route, TagType, useSearchState } from '@core/search';
import { getIntersection } from '@utils/array';
import { capitalize } from '@utils/capitalize';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';
import { useRouter } from 'next/router';

import { ChevronDownIcon, XIcon } from '@/ui/icons';

import { TagButton } from './TagButton';

export function TagTypeToggle({ type }: { type: TagType }) {
  const router = useRouter();
  const { tags } = useSearchState();

  const tagsForType = getTags(type);

  const selected = getIntersection(
    tagsForType,
    tags,
    (a, b) => a.name === b.name,
  );

  const hasAnySelected = selected.length > 0;

  function PrefixText() {
    return (
      <div
        className="flex flex-1 cursor-pointer items-center gap-1.5"
        onClick={() => route.search.tags.openType(type, router)}
      >
        <span className="text-left text-base leading-none">
          {capitalize(pluralize(type))}
        </span>
        {hasAnySelected && (
          <span className="text-base leading-none">
            {`(${selected.length})`}
          </span>
        )}
      </div>
    );
  }

  const selectedTag = route.search.tags.getType(router.asPath);

  return (
    <TagButton
      className={clsxm(
        (selectedTag && selectedTag === type) || hasAnySelected
          ? 'bg-color-primary text-white'
          : '',
      )}
    >
      <PrefixText />
      {hasAnySelected ? (
        <button onClick={() => route.search.clearType(type, router)}>
          <XIcon className="h-4 w-4" />
        </button>
      ) : (
        <ChevronDownIcon />
      )}
    </TagButton>
  );
}
