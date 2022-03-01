import { observer } from 'mobx-react-lite';

import { useGlobalStore } from '@/stores';

import SearchForm from '../common/search-form';
import FiltersControls from './filters-controls';

const ReposSearchControls = observer(function ReposSearchControls() {
  const { reposSearch } = useGlobalStore();

  return (
    <div className="flex flex-col gap-2">
      <SearchForm
        textInputProps={reposSearch.getTextInputProps({ autoFocused: true })}
        error={reposSearch.request.error}
        onSubmit={reposSearch.onSubmit}
        onReset={reposSearch.onReset}
        filters={reposSearch.tags}
      />
      <FiltersControls />
    </div>
  );
});

export default ReposSearchControls;
