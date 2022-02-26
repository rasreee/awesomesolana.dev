import { getTypeFilters, TagType } from '@modules/tags';
import { getIntersection } from '@utils';
import clsxm from '@utils/clsxm';
import { useRouter } from 'next/router';

import { useSearchState } from '@/hooks/useSearchState';
import { useToggleTag } from '@/hooks/useToggleTag';
import { Popover } from '@/ui/components';
import { route } from '@/utils/route';

import { TagTypeMenu } from './TagTypeMenu';

export function TagTypeModal() {
  const router = useRouter();
  const selectedCategory = route.search.tags.getType(router.asPath);

  const { tags: allFilters } = useSearchState();

  const toggleFilter = useToggleTag();

  const getSelectedFilters = (type: TagType) => {
    const categoryFilters = getTypeFilters(type);

    const selected = getIntersection(
      categoryFilters,
      allFilters,
      (a, b) => a.name === b.name,
    );

    return selected;
  };

  if (!selectedCategory) return null;

  const selectedFilters = getSelectedFilters(selectedCategory);

  const options = getTypeFilters(selectedCategory).filter(
    (filter) => !selectedFilters.map((item) => item.name).includes(filter.name),
  );

  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      onClose={() => route.search.tags.closeType(router)}
      isOpen={Boolean(selectedCategory)}
    >
      <TagTypeMenu
        type={selectedCategory}
        options={options}
        onClose={() => route.search.tags.closeType(router)}
        selected={selectedFilters}
        onToggleFilter={toggleFilter}
      />
    </Popover>
  );
}
