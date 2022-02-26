import {
  getTags,
  route,
  TagType,
  useSearchState,
  useToggleTag,
} from '@core/search';
import { getIntersection } from '@utils';
import clsxm from '@utils/clsxm';
import { useRouter } from 'next/router';

import { Popover } from '@/ui/components';

import { TagTypeMenu } from './TagTypeMenu';

export function TagTypeModal() {
  const router = useRouter();
  const selectedTag = route.search.tags.getType(router.asPath);

  const { tags } = useSearchState();

  const toggleFilter = useToggleTag();

  const getSelectedTags = (type: TagType) => {
    const tagsForType = getTags(type);

    const selected = getIntersection(
      tagsForType,
      tags,
      (a, b) => a.name === b.name,
    );

    return selected;
  };

  if (!selectedTag) return null;

  const selectedTags = getSelectedTags(selectedTag);

  const options = getTags(selectedTag).filter(
    (tag) => !selectedTags.map((item) => item.name).includes(tag.name),
  );

  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      onClose={() => route.search.tags.closeType(router)}
      isOpen={Boolean(selectedTag)}
    >
      <TagTypeMenu
        type={selectedTag}
        options={options}
        onClose={() => route.search.tags.closeType(router)}
        selected={selectedTags}
        onToggleFilter={toggleFilter}
      />
    </Popover>
  );
}
