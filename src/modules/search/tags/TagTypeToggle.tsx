import { TagType } from '@core/search';
import { capitalize } from '@utils/capitalize';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useSearchStore } from '@/stores/root-store';
import { ChevronDownIcon, XIcon } from '@/ui/icons';

import { TagButton } from './TagButton';

export const TagTypeToggle = observer(function TagTypeToggle({
  type,
}: {
  type: TagType;
}) {
  const searchStore = useSearchStore();

  const selectedCount = computed(
    () =>
      searchStore.reposSearch.tags.filter((tag) => tag.type === type).length,
  ).get();

  const handleRemove = () => {
    searchStore.reposSearch.clearTags(type);
  };

  return (
    <TagButton
      className={clsxm(
        (searchStore.tagTypeModal && searchStore.tagTypeModal === type) ||
          selectedCount
          ? 'bg-color-primary text-white'
          : '',
      )}
    >
      <div
        className="flex flex-1 cursor-pointer items-center gap-1.5"
        onClick={() => searchStore.openTagTypeModal(type)}
      >
        <span className="text-left text-base leading-none">
          {capitalize(pluralize(type))}
        </span>
        {selectedCount > 0 && (
          <span className="text-base leading-none">{`(${selectedCount})`}</span>
        )}
      </div>
      {selectedCount ? (
        <button onClick={handleRemove}>
          <XIcon className="h-4 w-4" />
        </button>
      ) : (
        <button onClick={() => searchStore.openTagTypeModal(type)}>
          <ChevronDownIcon />
        </button>
      )}
    </TagButton>
  );
});
