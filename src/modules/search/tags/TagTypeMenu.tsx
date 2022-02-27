import { getTags, Tag, TagType, tagUtils } from '@core/search';
import { XIcon } from '@primer/octicons-react';
import { capitalize } from '@utils';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';
import { runInAction } from 'mobx';
import useSWR from 'swr';

import { Divider, SearchForm, useSearchForm } from '@/ui/components';

import { useSearchStore } from '../SearchStore';
import { TagTypeFilterOption } from './TagTypeFilterOption';

export function TagTypeMenu({ type }: { type: TagType }) {
  const store = useSearchStore();

  const { data: tagsForType = [] } = useSWR(`tagsForType/${type}`, () =>
    getTags(type),
  );

  const searchForm = useSearchForm();

  const handleToggleFilter = (tag: Tag) => () =>
    runInAction(() => store.toggleTag(tag));

  const selectedTags = tagUtils.list(store.tags).ofType(type);

  const options = tagUtils.list(tagsForType).exclude(store.tags);

  return (
    <>
      <div
        className={clsxm(
          'py-3 px-5',
          'relative top-0 left-0 z-50 w-full',
          'flex flex-col gap-5',
          'bg-surface',
          'max-h-[20%]',
        )}
      >
        <div className="flex items-center justify-between pt-2">
          <h2 className="font-heading text-2xl font-semibold leading-none">
            {capitalize(pluralize(type))}
          </h2>
          <button onClick={store.closeTagTypeModal}>
            <XIcon />
          </button>
        </div>
        <SearchForm {...searchForm} onSubmit={searchForm.setQuery} />
      </div>
      <div className="relative top-5 z-0 h-[80%] w-full">
        {selectedTags?.length ? (
          <div className="flex flex-col gap-2 py-2">
            <span className="px-5 text-lg font-medium">Selected</span>
            <ul className={clsxm('px-5 pb-2', 'min-w-full')}>
              {selectedTags.map((tag) => (
                <TagTypeFilterOption
                  key={`${tag.type}_${tag.name}`}
                  tag={tag}
                  onClick={handleToggleFilter(tag)}
                />
              ))}
            </ul>
            <Divider />
          </div>
        ) : null}
        <ul className={clsxm('px-5 pt-3', 'h-full overflow-y-auto')}>
          {(store.tagsSearch.hits.length ? store.tagsSearch.hits : options).map(
            (tag) => (
              <TagTypeFilterOption
                key={`${tag.type}_${tag.name}`}
                tag={tag}
                onClick={handleToggleFilter(tag)}
              />
            ),
          )}
        </ul>
      </div>
    </>
  );
}
