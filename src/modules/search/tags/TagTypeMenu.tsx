import { getTagSuggestions, Tag, TagType } from '@core/search';
import { XIcon } from '@primer/octicons-react';
import { capitalize, waitFor } from '@utils';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';
import { runInAction } from 'mobx';
import { useEffect, useState } from 'react';

import { Divider, SearchForm, useSearchForm } from '@/ui/components';

import { useSearchStore } from '../SearchStore';
import { TagTypeFilterOption } from './TagTypeFilterOption';
import { useTags } from './useTags';

export function TagTypeMenu({ type }: { type: TagType }) {
  const searchStore = useSearchStore();

  const { data: tagsForType } = useTags(type);

  const [hits, setHits] = useState<Tag[]>([]);
  const searchForm = useSearchForm();

  useEffect(() => {
    const { query, setLoading, setError } = searchForm;

    if (!query) {
      return setHits(options);
    }

    setLoading(true);
    setError(null);
    waitFor(300)
      .then(async () => {
        const newHits = await getTagSuggestions(query, { type });
        setHits(newHits);
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [searchForm.query]);

  const handleToggleFilter = (tag: Tag) => () =>
    runInAction(() => searchStore.toggleTag(tag));

  const selectedTags = searchStore.getTags(type);
  const options = tagsForType
    ? tagsForType.filter(
        (tag) => !selectedTags?.map((item) => item.name).includes(tag.name),
      )
    : [];

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
          <button onClick={searchStore.closeTagTypeModal}>
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
          {(hits.length ? hits : options).map((tag) => (
            <TagTypeFilterOption
              key={`${tag.type}_${tag.name}`}
              tag={tag}
              onClick={handleToggleFilter(tag)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
