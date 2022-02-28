import { computed } from 'mobx';
import { observer } from 'mobx-react-lite';

import { exploreSEO } from '@/app/seo';
import { siteConfig } from '@/app/site-config';
import PageLayout from '@/layouts/page-layout';
import { useStore } from '@/lib/mobx/store-context';
import { Logo } from '@/ui/logo';
import Responsive from '@/ui/responsive/responsive';
import { TextInputProps } from '@/ui/text-input';

import SearchForm from '../search/search-form';
import { HomePageStore } from './home-page-store';
import PopularSources from './search-results/popular-sources';
import SearchResults from './search-results/search-results';

const HomePage = function HomePage() {
  const seo = exploreSEO();

  return (
    <PageLayout seo={seo}>
      <div className="min-h-main mx-auto flex w-full flex-1 flex-col gap-10 px-6 pt-28 md:max-w-3xl md:pt-36">
        <div className="flex flex-col items-center justify-center gap-6">
          <Responsive
            sm={<Logo size="lg" />}
            aboveSm={<Logo size="2xl" />}
            aboveMd={<Logo size="4xl" />}
          />
          <div className="text-body text-center text-base leading-normal text-opacity-80 sm:text-lg md:text-xl">
            {siteConfig.seo.description}
          </div>
        </div>
        <div className="relative flex h-min flex-col gap-3">
          <div className="relative z-50">
            <HomeSearchBox />
          </div>
          <SearchResults />
          <PopularSources />
        </div>
      </div>
    </PageLayout>
  );
};

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
      onReset={search.reset}
      onSubmit={search.submitSearch}
      textInputProps={getTextInputProps()}
    />
  );
});

export default HomePage;
