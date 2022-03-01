import { Tag, TagType } from '@awesomesolana/common';
import React from 'react';

import { groupBy } from '@/lib/group-by';

import TagGroupOptions from '../../common/tags-search/tag-group-options';

export interface GroupedTagsOptionsProps {
  options: Tag[];
  onSelect: (tag: Tag) => void;
}

const GroupedTagsOptions = function GroupedResults({
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
};

export default GroupedTagsOptions;
