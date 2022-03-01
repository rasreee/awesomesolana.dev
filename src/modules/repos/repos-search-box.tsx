import { observer } from 'mobx-react-lite';

import { useRootStore } from '@/app/stores';
import SearchForm from '@/modules/search/search-form';

export const ReposSearchBox = observer(function ReposSearchBox() {
  const { reposSearch } = useRootStore();

  return (
    <SearchForm
      textInputProps={reposSearch.getTextInputProps({ autoFocused: true })}
      error={reposSearch.request.error}
      onSubmit={reposSearch.onSubmit}
      onReset={reposSearch.onReset}
      filters={reposSearch.tags}
    />
  );
});
