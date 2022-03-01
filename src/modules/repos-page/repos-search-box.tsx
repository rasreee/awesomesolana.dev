import { observer } from 'mobx-react-lite';

import SearchForm from '@/modules/common/search-form';
import { useGlobalStore } from '@/stores';

export const ReposSearchBox = observer(function ReposSearchBox() {
  const { reposSearch } = useGlobalStore();

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
