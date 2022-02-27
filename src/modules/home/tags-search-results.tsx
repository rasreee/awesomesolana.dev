import { observer } from 'mobx-react-lite';

import { groupBy } from '@/lib/utils/group-by';

import { TagType } from '../tags';
import { TagsSearchStore } from '../tags/tags-search-store';
import RecommendedTopics from './recommended-topics';
import TagGroupList from './tag-group-list';

const TagsSearchResults = observer(
  ({ tagsSearchStore }: { tagsSearchStore: TagsSearchStore }) => {
    const isEmptyState = tagsSearchStore.hits.length === 0;

    const content = isEmptyState ? (
      <TagsSearchResultsEmpty />
    ) : (
      <>
        {Object.entries(groupBy(tagsSearchStore.hits, 'type')).map(
          ([type, tags]) =>
            tags.length > 0 && (
              <TagGroupList
                key={`group-tags__${type}`}
                type={type as TagType}
                tags={tags}
              />
            ),
        )}
      </>
    );

    return <>{content}</>;
  },
);

const TagsSearchResultsEmpty = () => {
  return (
    <div className="flex w-full flex-col gap-0 divide-y divide-base-700">
      <div className="">
        <RecommendedTopics />
      </div>
    </div>
  );
};

export default TagsSearchResults;
