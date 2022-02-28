import dynamic from 'next/dynamic';
import { useState } from 'react';

import { exploreSEO } from '@/app/seo';
import { siteConfig } from '@/app/site-config';
import PageLayout from '@/layouts/page-layout';
import TagsSearchResults from '@/modules/tags-search/tags-search-results';
import { useRootStore } from '@/stores/root-store';
import { Logo } from '@/ui/logo';
import Popover from '@/ui/popover';
import Responsive from '@/ui/responsive/responsive';

import PopularSources from './home-search-results/popular-sources';

const TagsSearchBox = dynamic(
  () => import('@/modules/tags-search/tags-search-box'),
);

const HomePage = function HomePage() {
  const seo = exploreSEO();

  const { tagsSearch: tagsSearchStore } = useRootStore();

  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

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
            <TagsSearchBox onInputClick={openMenu} />
          </div>
          <Popover
            className="bg-surface top-12 z-50 w-full flex-1 overflow-hidden py-5 px-3"
            isOpen={menuOpen}
            onClose={closeMenu}
          >
            <TagsSearchResults tagsSearchStore={tagsSearchStore} />
          </Popover>
          <PopularSources />
        </div>
      </div>
    </PageLayout>
  );
};

export default HomePage;
