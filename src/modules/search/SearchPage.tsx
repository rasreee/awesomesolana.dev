import { HideOnMobile, OnlyMobile } from '@/ui/components';
import { Layout } from '@/ui/layouts';

import { FiltersMenu } from './Filters';
import { MobileSearchBox } from './MobileSearchBox';
import { Results } from './Results';
import { SearchField } from './SearchField';

export function SearchPage() {
  return (
    <Layout>
      <OnlyMobile className="mx-5">
        <MobileSearchBox />
        <Results />
      </OnlyMobile>
      <HideOnMobile>
        <div className="flex justify-around gap-3 px-3">
          <div className="flex-1">
            <SearchField />
            <Results />
          </div>
          <div className="bg-surface sm:3/12 rounded-md lg:w-4/12">
            <FiltersMenu autoExpand />
          </div>
        </div>
      </HideOnMobile>
    </Layout>
  );
}
