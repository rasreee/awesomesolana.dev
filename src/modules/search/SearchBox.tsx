import { runInAction } from 'mobx';
import { observer } from 'mobx-react-lite';

import { SearchForm } from '@/ui/components';

import { useSearchStore } from './SearchStore';

export const SearchBox = observer(function SearchBox() {
  const searchStore = useSearchStore();

  const handleReset = () => {
    runInAction(() => searchStore.setQuery(''));
  };

  return (
    <SearchForm
      query={searchStore.searchForm.query}
      loading={searchStore.searchForm.loading}
      error={searchStore.searchForm.error}
      onSubmit={searchStore.submitQuery}
      onChange={searchStore.setQuery}
      onReset={handleReset}
    />
  );
});
