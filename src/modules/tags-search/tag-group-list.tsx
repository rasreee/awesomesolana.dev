import { useRouter } from 'next/router';

import { appRoute } from '@/app/routes';
import { Tag, TagType } from '@/domains/tags/tags.types';
import pluralize from '@/lib/utils/pluralize';
import { capitalize } from '@/lib/utils/string';
import { useRootStore } from '@/stores/root-store';

const TagGroupList = ({ type, tags }: { type: TagType; tags: Tag[] }) => {
  const router = useRouter();
  const { tagsSearch: tagsSearchStore } = useRootStore();

  const handleSelect = (tag: Tag) => () => {
    router.push(appRoute.repos.search({ tags: [tag] }));
    tagsSearchStore.onReset();
  };

  return (
    <div className="flex w-full flex-col gap-2 px-1">
      <span className="px-3 py-2 text-lg font-semibold">
        {capitalize(pluralize(type))} {`(${tags.length})`}
      </span>
      <ul className="max-h-[16rem] overflow-y-auto">
        {tags.map((tag) => (
          <li
            className="w-full"
            key={`group-tags-item__${tag.type}-${tag.name}`}
          >
            <button
              className="hover:bg-surface-1 w-full rounded-md py-3 px-3 text-left"
              onClick={handleSelect(tag)}
            >
              {tag.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TagGroupList;
