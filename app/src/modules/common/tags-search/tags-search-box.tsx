import { SearchForm, TextInputProps } from '@awesomesolana/ui';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useGlobalStore } from '@/stores';

const TagsSearchBox = observer(function TagsSearchBox({
  onInputClick,
}: {
  onInputClick?: () => void;
}) {
  const { tagsSearch: tagsSearchStore } = useGlobalStore();

  const getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      value: tagsSearchStore.query,
      onChange: tagsSearchStore.onChange,
    })).get();

  return (
    <SearchForm
      error={tagsSearchStore.request.error}
      onSubmit={tagsSearchStore.onSubmit}
      textInputProps={getTextInputProps({
        onClick: onInputClick,
      })}
    />
  );
});

export default TagsSearchBox;
