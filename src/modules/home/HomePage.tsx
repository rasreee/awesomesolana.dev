import React from 'react';

import { useToggleFilter } from '@/contexts/SearchContext';
import { SearchField, useSearchField } from '@/modules/search/components';
import { getTagSuggestions, Tag } from '@/modules/tags';
import { Logo } from '@/ui/components';

import { GroupedResults } from './GroupedResults';

const DESCRIPTION =
  'Browse open-source projects built on Solana, filterable by dependencies, languages, frameworks, and/or topics.';

export function HomePage() {
  const { hits, isRequesting, reset, query, onChange, error } =
    useSearchField(getTagSuggestions);

  const toggleFilter = useToggleFilter();

  const handleAddFilter = (tag: Tag) => {
    toggleFilter(tag);
    reset();
  };

  return (
    <div className="mx-auto px-6 md:max-w-3xl">
      <div className="my-24 flex w-full flex-col gap-10">
        <div className="mx-auto flex flex-col items-center gap-6">
          <Logo size="lg" />
          <div className="text-body  text-center text-base leading-normal text-opacity-80 sm:text-lg md:text-xl">
            {DESCRIPTION}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <SearchField
            autoFocused
            {...{ hits, error, isRequesting, query, onChange, reset }}
          />
          <GroupedResults
            isOpen={hits.length > 0 && !isRequesting}
            hits={hits}
            onAddFilter={handleAddFilter}
            onRequestClose={reset}
          />
        </div>
      </div>
    </div>
  );
}
