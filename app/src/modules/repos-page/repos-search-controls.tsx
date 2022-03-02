import { SearchForm } from '@awesomesolana/ui';
import { observer } from 'mobx-react-lite';

import { useSearchQuery } from '@/contexts/search-query-context';
import { useGlobalStore } from '@/stores';

const ReposSearchControls = observer(function ReposSearchBox() {
  const { search } = useGlobalStore();
  const searchQuery = useSearchQuery();

  const onSubmit = () => {
    searchQuery.setTerm(search.value);
  };

  return (
    <SearchForm
      textInputProps={search.getTextInputProps({ autoFocused: true })}
      error={search.error}
      onSubmit={onSubmit}
    />
  );
});

export default ReposSearchControls;
