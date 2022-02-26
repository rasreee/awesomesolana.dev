import { reaction } from 'mobx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '@/layouts/Layout';
import { StoreProvider } from '@/mobx/storeContext';
import { Seo } from '@/ui/components';

import { SearchStore } from './SearchStore';

export const SearchPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const [store] = useState(() => new SearchStore());

  useEffect(() => {
    reaction(
      () => store.rootUrl,
      (rootUrl) => {
        router.push(rootUrl, undefined, { shallow: true });
      },
    );
  }, []);

  return (
    <Layout>
      <StoreProvider store={store}>
        <Seo title="Search" />
        <div className="flex-1 px-3 sm:px-6">{children}</div>
      </StoreProvider>
    </Layout>
  );
};
