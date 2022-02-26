import { route } from '@core/search';
import clsxm from '@utils/clsxm';
import { useRouter } from 'next/router';

import { Popover } from '@/ui/components';

import { TagTypeMenu } from './TagTypeMenu';

export function TagTypeModal() {
  const router = useRouter();
  const tagType = route.search.tags.getType(router.asPath);

  if (!tagType) return null;

  return (
    <Popover
      className={clsxm(
        'bg-surface fixed bottom-0 left-0 !min-w-full',
        'h-[56%]',
        'rounded-none rounded-t-xl',
      )}
      onClose={() => route.search.tags.closeType(router)}
      isOpen={Boolean(tagType)}
    >
      <TagTypeMenu type={tagType} />
    </Popover>
  );
}
