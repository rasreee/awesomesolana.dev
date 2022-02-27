import { observer } from 'mobx-react-lite';

import { siteConfig } from '@/configs/site-config';
import { Logo, TagsSearchBox } from '@/ui/components';
import { Responsive } from '@/ui/responsive';

import { GroupedResults } from './GroupedResults';

export const HomePage = observer(function HomePage() {
  return (
    <>
      <div className="min-h-main mx-auto flex w-full flex-1 flex-col gap-10 px-6 pt-28 md:max-w-3xl md:pt-36">
        <div className="flex flex-col items-center justify-center gap-6">
          <Responsive sm={<Logo size="md" />} aboveSm={<Logo size="lg" />} />
          <div className="text-body text-center text-base leading-normal text-opacity-80 sm:text-lg md:text-xl">
            {siteConfig.seo.description}
          </div>
        </div>
        <div className="flex h-min flex-col gap-3">
          <TagsSearchBox />
          <GroupedResults />
        </div>
      </div>
    </>
  );
});
