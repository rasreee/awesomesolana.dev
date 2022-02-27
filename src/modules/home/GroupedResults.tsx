import { searchRoute, Tag, TagType, tagTypes } from '@core/search';
import pluralize from '@utils/pluralize';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

import { useSearchStore } from '@/stores/root-store';
import { Popover } from '@/ui/components';
import { capitalize } from '@/utils/string';

type GroupedHits = Array<{ type: TagType; hits: Tag[] }>;

function groupByTag(list: Tag[]): GroupedHits {
  const groups = tagTypes.map((type) => ({
    type,
    hits: list.filter((tag) => tag.type === type),
  }));

  return groups;
}

export const GroupedResults = observer(function GroupedResults() {
  const router = useRouter();
  const { tagsSearch } = useSearchStore();

  const handleTagClick = (tag: Tag) => () => {
    router.push(searchRoute.page({ tags: [tag] }));
  };

  return (
    <Popover
      className="bg-surface relative overflow-hidden py-5 px-3"
      isOpen={!!tagsSearch.hits.length}
      onClose={tagsSearch.onReset}
    >
      {groupByTag(tagsSearch.hits).map(
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
