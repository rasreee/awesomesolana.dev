import { SearchForm, TextInputProps } from '@awesomesolana/ui';
import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/lib/mobx/store-context';

import { HomePageStore } from './home-page-store';

const HomeSearchBox = observer(() => {
  const homePageStore = useStore<HomePageStore>();
  const { search } = homePageStore;

  const getTextInputProps = (props?: Partial<TextInputProps>): TextInputProps =>
    computed(() => ({
      ...props,
      ...{
        onClick: homePageStore.openMenu,
        onChange: homePageStore.onSearchQueryChange,
        value: search.query,
      },
    })).get();

  return (
    <SearchForm
      error={search.error}
      onSubmit={search.submitSearch}
      textInputProps={getTextInputProps()}
    />
  );
});

export default HomeSearchBox;
