import { observer } from 'mobx-react-lite';

import { allTags } from '@/core/search';
import { useRootStore } from '@/stores/root-store';

import SearchForm from './SearchForm';

const TagsSearchBox = observer(function TagsSearchBox() {
  const store = useRootStore();

  const handleInputClick = () => {
    store.tagsSearch.setHits(allTags.slice(0, 10));
  };

  return (
    <SearchForm
      request={store.tagsSearch.request}
      onReset={store.tagsSearch.onReset}
      onSubmit={store.tagsSearch.onSubmit}
      textInputProps={store.tagsSearch.getTextInputProps({
        onClick: handleInputClick,
      })}
    />
  );
});

export default TagsSearchBox;
