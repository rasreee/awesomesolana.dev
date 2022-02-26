import { XIcon } from '@primer/octicons-react';
import { useEffect, useState } from 'react';

import { FilterCategory, getTagSuggestions, Tag } from '@/modules/tags';
import { Divider, SearchForm, useSearchForm } from '@/ui/components';
import { capitalize, waitFor } from '@/utils';
import clsxm from '@/utils/clsxm';
import pluralize from '@/utils/pluralize';

import { OptionCategoryItemButton } from './OptionCategoryCheckBox';

export function FilterCategoryMenu({
  category,
  options,
  selected,
  onClose,
  onToggleFilter,
}: {
  category: FilterCategory;
  options: Tag[];
  selected: Tag[];
  onClose: () => void;
  onToggleFilter: (tag: Tag) => void;
}) {
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
        const newHits = await getTagSuggestions(query, { category });
        setHits(newHits);
      })
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, [searchForm.query]);

  const handleToggleFilter = (tag: Tag) => () => {
    onToggleFilter(tag);
  };

  const getIsFilterActive = (tag: Tag): boolean =>
    selected
      .filter((tag) => tag.category === tag.category)
      .map((item) => item.name)
      .includes(tag.name);

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
            {capitalize(pluralize(category))}
          </h2>
          <button onClick={onClose}>
            <XIcon />
          </button>
        </div>
        <SearchForm {...searchForm} onSubmit={searchForm.setQuery} />
      </div>
      <div className="relative top-5 z-0 h-[80%] w-full">
        {selected.length ? (
          <div className="flex flex-col gap-2 py-2">
            <span className="px-5 text-lg font-medium">Selected</span>
            <ul className={clsxm('px-5 pb-2', 'min-w-full')}>
              {selected.map((tag) => (
                <OptionCategoryItemButton
                  key={`${tag.category}_${tag.name}`}
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
            <OptionCategoryItemButton
              key={`${tag.category}_${tag.name}`}
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
