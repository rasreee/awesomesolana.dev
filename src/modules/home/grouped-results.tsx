import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { appRoute } from '@/app/routes';
import { groupBy } from '@/lib/utils/group-by';
import pluralize from '@/lib/utils/pluralize';
import { capitalize } from '@/lib/utils/string';
import { Tag, TagType } from '@/modules/tags';
import { useTagsSearchStore } from '@/modules/tags/tags-search-store';
import Popover from '@/ui/popover';

const GroupedResults = observer(function GroupedResults() {
  const tagsSearchStore = useTagsSearchStore();

  const tagGroups = computed(() => groupBy(tagsSearchStore.hits, 'type')).get();

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      isOpen={!!tagsSearchStore.hits.length}
      onClose={tagsSearchStore.onReset}
    >
      {Object.entries(tagGroups).map(
        ([type, tags]) =>
          tags.length > 0 && (
            <GroupTags
              key={`group-tags__${type}`}
              type={type as TagType}
              tags={tags}
            />
          ),
      )}
    </Popover>
  );
});

const GroupTags = ({ type, tags }: { type: TagType; tags: Tag[] }) => {
  const router = useRouter();
  const tagsSearchStore = useTagsSearchStore();

  const handleSelect = (tag: Tag) => () => {
    router.push(appRoute.repos.search({ tags: [tag] }));
    tagsSearchStore.onReset();
  };

  return (
    <div className="flex flex-col gap-2 px-1" key={type}>
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

export default GroupedResults;
