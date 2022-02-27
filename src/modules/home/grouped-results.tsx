import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { appRoute } from '@/app/routes';
import pluralize from '@/lib/utils/pluralize';
import { capitalize } from '@/lib/utils/string';
import { Tag, TagType, tagTypes } from '@/modules/tags';
import { useTagsSearchStore } from '@/stores/tags-search-store';
import Popover from '@/ui/popover';

type GroupedHits = Array<{ type: TagType; hits: Tag[] }>;

function groupByTag(list: Tag[]): GroupedHits {
  const groups = tagTypes.map((type) => ({
    type,
    hits: list.filter((tag) => tag.type === type),
  }));

  return groups;
}

const GroupedResults = observer(function GroupedResults() {
  const router = useRouter();
  const tagsSearchStore = useTagsSearchStore();

  const handleTagClick = (tag: Tag) => () => {
    router.push(appRoute.repos.search({ tags: [tag] }));
  };

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      isOpen={!!tagsSearchStore.hits.length}
      onClose={tagsSearchStore.onReset}
    >
      {groupByTag(tagsSearchStore.hits).map(
        ({ type, hits: list }) =>
          list.length > 0 && (
            <div className="flex flex-col gap-2 px-1" key={type}>
              <span className="px-3 py-2 text-lg font-semibold">
                {capitalize(pluralize(type))} {`(${list.length})`}
              </span>
              <ul className="max-h-[16rem] overflow-y-auto">
                {list.map((hit) => (
                  <li className="w-full" key={`${hit.type}_${hit.name}`}>
                    <button
                      className="hover:bg-surface-1 w-full rounded-md py-3 px-3 text-left"
                      onClick={handleTagClick(hit)}
                    >
                      {hit.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ),
      )}
    </Popover>
  );
});

export default GroupedResults;
