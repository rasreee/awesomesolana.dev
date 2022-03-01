import { exploreSEO } from '@/app/seo';
import { siteConfig } from '@/app/site-config';
import { Logo } from '@/ui/logo';
import Responsive from '@/ui/responsive/responsive';

import PageLayout from '../common/page-layout';
import HomeSearchBox from './home-search-box';
import HomeSearchResults from './home-search-results/home-search-results';

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
          <HomeSearchBox />
          <div className="absolute top-12 z-50">
            <HomeSearchResults />
          </div>
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
