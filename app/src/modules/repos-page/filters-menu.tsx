import { getTags, tagUtils } from '@awesomesolana/common';
import { TagType } from '@awesomesolana/common';
import times from 'lodash.times';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

import { useSearchQuery } from '@/contexts/search-query-context';
import clsxm from '@/lib/clsxm';
import pluralize from '@/lib/pluralize';
import { capitalize } from '@/lib/string';
import { useGlobalStore } from '@/stores';
import { Divider } from '@/ui/divider';
import Shimmer from '@/ui/shimmer';

import TagsSearchBox from '../common/tags-search/tags-search-box';

const XIcon = dynamic(() => import('@/ui/icons/x-icon'));

const RepoFilterCheckBox = dynamic(() => import('./filter-check-box'));

const FiltersMenu = observer(function FiltersMenu({ type }: { type: TagType }) {
  const store = useGlobalStore();
  const { tags } = useSearchQuery();
  const { tagTypeModal } = store;

  const { data: tagsForType } = useSWR(`tagsForType/${type}`, () =>
    getTags(type),
  );

  const selectedTags = tagUtils.list(tags).ofType(type);

  const options = tagsForType
    ? tagUtils.list(tagsForType).exclude(selectedTags)
    : null;

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
          <button onClick={tagTypeModal.onClose}>
            <XIcon />
          </button>
        </div>
        <TagsSearchBox />
      </div>
      <div className="relative top-5 z-0 h-[80%] w-full">
        {selectedTags?.length ? (
          <div className="flex flex-col gap-2 py-2">
            <span className="px-5 text-lg font-medium">Selected</span>
            <ul className={clsxm('px-5 pb-2', 'min-w-full')}>
              {selectedTags.map((tag) => (
                <RepoFilterCheckBox key={`${tag.type}_${tag.name}`} tag={tag} />
              ))}
            </ul>
            <Divider />
          </div>
        ) : null}
        <>
          {options ? (
            <ul className={clsxm('px-5 pt-3', 'h-full overflow-y-auto')}>
              {options.map((tag) => (
                <RepoFilterCheckBox key={`${tag.type}_${tag.name}`} tag={tag} />
              ))}
            </ul>
          ) : (
            <ul className={'gap-2 px-5 pt-3'}>
              {times(5, (index) => (
                <li key={index}>
                  <Shimmer className="h-3 w-16" />
                </li>
              ))}
            </ul>
          )}
        </>
      </div>
    </>
  );
});

export default FiltersMenu;
