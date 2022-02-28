import { observer } from 'mobx-react-lite';

import SearchForm from '@/modules/search/search-form';
import { useRootStore } from '@/stores/root-store';

export const ReposSearchBox = observer(function ReposSearchBox() {
  const { reposSearch } = useRootStore();

  return (
    <SearchForm
      textInputProps={reposSearch.getTextInputProps({ autoFocused: true })}
      request={reposSearch.request}
      onSubmit={reposSearch.onSubmit}
      onReset={reposSearch.onReset}
      filters={reposSearch.tags}
    />
  );
});
