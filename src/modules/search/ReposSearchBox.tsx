import { observer } from 'mobx-react-lite';

import { useRootStore } from '@/stores/root-store';
import SearchForm from '@/ui/search/SearchForm';

export const ReposSearchBox = observer(function ReposSearchBox() {
  const { reposSearch } = useRootStore();

  return (
    <SearchForm
      textInputProps={reposSearch.getTextInputProps({ autoFocused: true })}
      request={reposSearch.request}
      onSubmit={reposSearch.onSubmit}
      onReset={reposSearch.onReset}
    />
  );
});
