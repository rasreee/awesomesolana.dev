import { reaction } from 'mobx';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { StoreProvider } from '@/mobx/storeContext';
import { RootStore } from '@/stores/root-store';

const Seo = dynamic(() => import('@/ui/components/Seo'));
const Layout = dynamic(() => import('@layouts/Layout'));

const SearchPageLayout = ({
  children,
  title = 'Search',
}: {
  children: React.ReactNode;
  title?: string;
}) => {
  const router = useRouter();

  const [store] = useState(() => new RootStore());

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
        <Seo title={title} />
        <div className="flex-1 px-3 sm:px-6">{children}</div>
      </StoreProvider>
    </Layout>
  );
};

export default SearchPageLayout;
