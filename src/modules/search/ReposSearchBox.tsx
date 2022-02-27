import { observer } from 'mobx-react-lite';

import { useSearchStore } from '@/stores/root-store';
import { SearchForm } from '@/ui/components';

export const ReposSearchBox = observer(function ReposSearchBox() {
  const { reposSearch } = useSearchStore();

  return (
    <SearchForm
      textInputProps={reposSearch.getTextInputProps({ autoFocused: true })}
      request={reposSearch.request}
      onSubmit={reposSearch.onSubmit}
      onReset={reposSearch.onReset}
    />
  );
});
