import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { allTags } from '@/modules/tags';
import { useTagsSearchStore } from '@/modules/tags/tags-search-store';
import { TextInputProps } from '@/ui/text-input';

const SearchForm = dynamic(() => import('@/modules/search/search-form'));

const TagsSearchBox = observer(function TagsSearchBox() {
  const store = useTagsSearchStore();

  const handleInputClick = () => {
    store.setHits(allTags.slice(0, 10));
  };

  const getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      value: store.query,
      onChange: store.onChange,
    })).get();

  return (
    <SearchForm
      request={store.request}
      onReset={store.onReset}
      onSubmit={store.onSubmit}
      textInputProps={getTextInputProps({
        onClick: handleInputClick,
      })}
    />
  );
});

export default TagsSearchBox;
