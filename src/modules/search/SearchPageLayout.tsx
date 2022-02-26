import { useState } from 'react';

import Layout from '@/layouts/Layout';
import { StoreProvider } from '@/mobx/storeContext';
import { Seo } from '@/ui/components';

import { SearchStore } from './SearchStore';

export const SearchPageLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [store] = useState(() => new SearchStore());

  return (
    <Layout>
      <StoreProvider store={store}>
        <Seo title="Search" />
        <div className="flex-1 px-3 sm:px-6">{children}</div>
      </StoreProvider>
    </Layout>
  );
};
