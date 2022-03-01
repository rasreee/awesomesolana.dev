import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';
import dynamic from 'next/dynamic';

import { useRootStore } from '@/app/stores';
import { TextInputProps } from '@/ui/text-input';

const SearchForm = dynamic(() => import('@/modules/common/search-form'));

const TagsSearchBox = observer(function TagsSearchBox({
  onInputClick,
}: {
  onInputClick?: () => void;
}) {
  const { tagsSearch: tagsSearchStore } = useRootStore();

  const getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      value: tagsSearchStore.query,
      onChange: tagsSearchStore.onChange,
    })).get();

  return (
    <SearchForm
      error={tagsSearchStore.request.error}
      onReset={tagsSearchStore.onReset}
      onSubmit={tagsSearchStore.onSubmit}
      textInputProps={getTextInputProps({
        onClick: onInputClick,
      })}
    />
  );
});

export default TagsSearchBox;
