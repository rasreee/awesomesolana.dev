import {
  filtersByType,
  SEARCH_FILTERS,
  SearchFilter,
  searchFilters,
  sortFiltersByProjectCount,
  toPluralFilterType,
} from '@/api/filters';
import { getProjectsCountForTag } from '@/api/projects';
import { getIntersection } from '@/common/utils';
import { useSearch } from '@/contexts/search';
import { useSearchField } from '@/modules/search/SearchField';
import {
  CheckBox,
  PrimaryButton,
  SolidButton,
  TextInput,
} from '@/ui/components';
import { clsxm } from '@/ui/utils';

export function CategoryFilterMultiSelect({
  type,
  onRequestClose,
}: {
  type: SearchFilter['type'];
  onRequestClose: () => void;
}) {
  const fallbackResults = filtersByType(SEARCH_FILTERS, type);

  const runSearch = async (searchQuery: string): Promise<SearchFilter[]> => {
    if (!searchQuery) return fallbackResults;

    const filters = await searchFilters(searchQuery, { type }).then(
      sortFiltersByProjectCount,
    );
    return filters;
  };

  const { query, hits, setQuery, onChange } = useSearchField(runSearch);

  const { toggleFilter, getFilterChecked, clearFiltersByType, search } =
    useSearch();

  const onClickTag = (tag: SearchFilter) => () => {
    toggleFilter(tag);
    setQuery('');
  };

  return (
    <div className="relative z-0 h-screen overflow-y-auto">
      <div className="bg-surface sticky top-0 left-0 z-50 max-h-min w-full px-4 py-2">
        <div className="flex items-center justify-between py-4 pb-7">
          <SolidButton
            disabled={
              getIntersection(
                search.tags ?? [],
                hits,
                (a, b) => a.name === b.name,
              ).length === 0
            }
            onClick={() => clearFiltersByType(type)}
          >
            Clear
          </SolidButton>
          <span className="text-lg font-semibold">
            {toPluralFilterType(type)}
          </span>
          <PrimaryButton onClick={onRequestClose}>Done</PrimaryButton>
        </div>
        <TextInput
          type="search"
          name={`${type}-filter-search`}
          value={query}
          onChange={onChange}
          placeholder={`Search ${toPluralFilterType(type)}...`}
          className={clsxm('bg-surface-1 w-full py-3')}
        />
      </div>
      <div className="text-hint px-5 pt-1 text-sm leading-none">
        {fallbackResults.length} results found
      </div>
      <div className="absolute z-0 flex-1 pb-10">
        <ul
          className={clsxm(
            'flex w-full flex-col items-center gap-3 overflow-y-auto pt-5',
          )}
        >
          {(hits.length ? hits : fallbackResults).map((hit) => (
            <li
              key={hit.name}
              className="flex w-full cursor-pointer items-center justify-between px-5 py-2.5"
              onClick={onClickTag(hit)}
            >
              <div className="flex items-center gap-3">
                <CheckBox checked={getFilterChecked(hit)} readOnly />
                <span className="text-lg leading-none">{hit.name}</span>
                <span className="text-lg leading-none">
                  {`(${getProjectsCountForTag(hit)})`}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
