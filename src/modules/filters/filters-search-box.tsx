import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { allTags } from '@/modules/tags';
import { useTagsSearchStore } from '@/stores/tags-search-store';

const SearchForm = dynamic(() => import('@/modules/search/search-form'));

const FiltersSearchBox = observer(function FiltersSearchBox() {
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

export default FiltersSearchBox;
