import { observer } from 'mobx-react-lite';

import { allTags } from '@/core/tags';
import { useTagsSearchStore } from '@/core/tags/tags-search-store';

import SearchForm from './SearchForm';

const TagsSearchBox = observer(function TagsSearchBox() {
  const tagsSearchStore = useTagsSearchStore();

  const handleInputClick = () => {
    tagsSearchStore.setHits(allTags.slice(0, 10));
  };

  return (
    <SearchForm
      request={tagsSearchStore.request}
      onReset={tagsSearchStore.onReset}
      onSubmit={tagsSearchStore.onSubmit}
      textInputProps={tagsSearchStore.getTextInputProps({
        onClick: handleInputClick,
      })}
    />
  );
});

export default TagsSearchBox;
