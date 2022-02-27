import { TagType } from '@core/tags';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { useRootStore } from '@/stores/root-store';
import { capitalize } from '@/utils/string';

import { TagButton } from './TagButton';

const ChevronDownIcon = dynamic(() => import('@/ui/icons/ChevronDownIcon'));
const XIcon = dynamic(() => import('@/ui/icons/XIcon'));

const TagTypeToggle = observer(function TagTypeToggle({
  type,
}: {
  type: TagType;
}) {
  const searchStore = useRootStore();
  const { tagTypeModal } = searchStore;

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
        (tagTypeModal.tagType && tagTypeModal.tagType === type) || selectedCount
          ? 'bg-color-primary text-white'
          : '',
      )}
    >
      <div
        className="flex flex-1 cursor-pointer items-center gap-1.5"
        onClick={() => tagTypeModal.openTagType(type)}
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
        <button onClick={() => tagTypeModal.openTagType(type)}>
          <ChevronDownIcon />
        </button>
      )}
    </TagButton>
  );
});

export default TagTypeToggle;
