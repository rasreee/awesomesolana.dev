import { observer } from 'mobx-react-lite';
import React from 'react';

import { TagType } from '@/domains/tags/tags.types';
import { useStore } from '@/lib/mobx/store-context';
import { groupBy } from '@/lib/utils/group-by';
import TagGroupList from '@/modules/tags-search/tag-group-list';

import { HomePageStore } from '../home-page-store';

const GroupedResults = observer(function GroupedResults() {
  const homePageStore = useStore<HomePageStore>();

  const tagGroups = groupBy(homePageStore.search.results, 'type');

  return (
    <>
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
    </>
  );
});

export default GroupedResults;
