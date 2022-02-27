import dynamic from 'next/dynamic';

import { exploreSEO } from '@/app/seo';
import { siteConfig } from '@/app/site-config';
import PageLayout from '@/layouts/page-layout';
import { Logo } from '@/ui/logo';
import Responsive from '@/ui/responsive/responsive';

const GroupedResults = dynamic(() => import('./grouped-results'));
const FiltersSearchBox = dynamic(
  () => import('@/modules/filters/filters-search-box'),
);

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
        <div className="flex h-min flex-col gap-3">
          <FiltersSearchBox />
          <GroupedResults />
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;