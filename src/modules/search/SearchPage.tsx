import { useEffect, useState } from 'react';

import { waitFor } from '@/lib/waitFor';
import { HideOnMobile, OnlyMobile } from '@/ui/components';
import { Layout } from '@/ui/layouts';

import { FiltersMenu } from './Filters';
import { MobileSearchBox } from './MobileSearchBox';
import { Results } from './Results';
import { SearchBox } from './SearchBox';

export function SearchPage() {
  const [value, setValue] = useState('');
  const [isRequesting, setIsRequesting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchBoxProps = { value, onChange: setValue, isRequesting, error };

  const submitQuery = async (query: string) => {
    setIsRequesting(true);
    setError(null);
    try {
      console.log('submitQuery', query);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setIsRequesting(false);
    }
  };

  useEffect(() => {
    waitFor(300).then(() => submitQuery(value));
  }, [value]);

  return (
    <Layout>
      <OnlyMobile className="mx-5">
        <MobileSearchBox {...searchBoxProps} />
      </OnlyMobile>
      <HideOnMobile>
        <div className="flex justify-around gap-3 px-3">
          <div className="flex-1">
            <SearchBox {...searchBoxProps} />
          </div>
          <div className="bg-surface sm:3/12 rounded-md lg:w-4/12">
            <FiltersMenu autoExpand />
          </div>
        </div>
      </HideOnMobile>
      <Results />
    </Layout>
  );
}
