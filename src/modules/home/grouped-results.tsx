import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import { groupBy } from '@/lib/utils/group-by';
import { TagsSearchStore } from '@/modules/search/tags-search-store';
import { TagType } from '@/modules/search/types';
import Popover from '@/ui/popover';

import TagGroupList from './tag-group-list';

const GroupedResults = observer(function GroupedResults({
  tagsSearchStore,
}: {
  tagsSearchStore: TagsSearchStore;
}) {
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
            <TagGroupList
              key={`group-tags__${type}`}
              type={type as TagType}
              tags={tags}
            />
          ),
      )}
    </Popover>
  );
});

export default GroupedResults;
