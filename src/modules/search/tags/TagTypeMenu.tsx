import {
  getTagSuggestions,
  route,
  Tag,
  TagType,
  useSearchState,
  useToggleTag,
} from '@core/search';
import { XIcon } from '@primer/octicons-react';
import { capitalize, getIntersection, waitFor } from '@utils';
import clsxm from '@utils/clsxm';
import pluralize from '@utils/pluralize';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { Divider, SearchForm, useSearchForm } from '@/ui/components';

import { TagTypeFilterOption } from './TagTypeFilterOption';
import { useTags } from './useTags';

export function TagTypeMenu({ type }: { type: TagType }) {
  const router = useRouter();

  const handleClose = () => {
    route.search.tags.closeType(router);
  };

  const { data: tagsForType } = useTags(type);

  const { tags } = useSearchState();

  const toggleFilter = useToggleTag();

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

  const handleToggleFilter = (tag: Tag) => () => toggleFilter(tag);

  const selectedTags = tagsForType
    ? getIntersection(tagsForType, tags, (a, b) => a.name === b.name)
    : undefined;

  const options = tagsForType
    ? tagsForType.filter(
        (tag) => !selectedTags?.map((item) => item.name).includes(tag.name),
      )
    : [];

  const getIsFilterActive = (tag: Tag): boolean =>
    selectedTags
      ?.filter((tag) => tag.type === tag.type)
      .map((item) => item.name)
      .includes(tag.name) ?? false;

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
          <button onClick={handleClose}>
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
                  checked={getIsFilterActive(tag)}
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
              checked={getIsFilterActive(tag)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}
