import { observer } from 'mobx-react-lite';
import React from 'react';

import { Tag, TagType } from '@/domains/tags/tags.types';
import { groupBy } from '@/lib/utils/group-by';

import TagGroupOptions from '../../common/tags-search/tag-group-options';

export interface GroupedTagsOptionsProps {
  options: Tag[];
  onSelect: (tag: Tag) => void;
}

const GroupedTagsOptions = observer(function GroupedResults({
  options,
  onSelect,
}: GroupedTagsOptionsProps) {
  const tagGroups = groupBy(options, 'type');

  return (
    <>
      {Object.entries(tagGroups).map(
        ([type, tags]) =>
          tags.length > 0 && (
            <TagGroupOptions
              key={`group-tags__${type}`}
              type={type as TagType}
              tags={tags}
              onSelect={onSelect}
            />
          ),
      )}
    </>
  );
});

export default GroupedTagsOptions;
