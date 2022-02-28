import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';
import useSWR from 'swr';

import clsxm from '@/lib/utils/clsxm';
import pluralize from '@/lib/utils/pluralize';
import { capitalize } from '@/lib/utils/string';
import { useRootStore } from '@/stores/root-store';
import { Divider } from '@/ui/divider';

import { getTags, tagUtils } from '../search/tags.utils';
import { TagType } from '../search/types';
import TagsSearchBox from './tags-search-box';

const XIcon = dynamic(() => import('@/ui/icons/x-icon'));

const RepoFilterCheckBox = dynamic(() => import('./filter-check-box'));

const FilterTypeMenu = observer(function FilterTypeMenu({
  type,
}: {
  type: TagType;
}) {
  const store = useRootStore();
  const { tagTypeModal } = store;

  const { data: tagsForType } = useSWR(`tagsForType/${type}`, () =>
    getTags(type),
  );

  const selectedTags = computed(() =>
    store.reposSearch.tags.filter((tag) => tag.type === type),
  ).get();

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
            <div>Loading...</div>
          )}
        </>
      </div>
    </>
  );
});

export default FilterTypeMenu;
