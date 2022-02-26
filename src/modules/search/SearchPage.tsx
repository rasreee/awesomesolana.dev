import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

import { SearchForm } from '@/ui/components';

import { Results } from './Results';
import { useSearchStore } from './SearchStore';
import { TagTypeModal } from './tags/TagTypeModal';
import { TagTypesControls } from './tags/TagTypesControls';

export const SearchPage = observer(function SearchPage() {
  const searchStore = useSearchStore();

  const handleReset = () => {
    runInAction(() => searchStore.setQuery(''));
  };

  return (
    <>
      <div className="flex flex-col gap-2">
        <SearchForm
          query={searchStore.searchForm.query}
          loading={searchStore.searchForm.loading}
          error={searchStore.searchForm.error}
          onSubmit={searchStore.submitQuery}
          onChange={searchStore.setQuery}
          onReset={handleReset}
        />
        <TagTypesControls />
        <TagTypeModal />
      </div>
      <Results />
    </>
  );
});
