import { reaction } from 'mobx';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Layout from '@/layouts/Layout';
import { StoreProvider } from '@/mobx/storeContext';
import { SearchStore } from '@/stores/root-store';
import { Seo } from '@/ui/components';

const HomePageLayout = ({
  children,
  title = 'Home',
}: {
  children: React.ReactNode;
  title?: string;
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
        <Seo title={title} />
        <div className="flex-1 px-3 sm:px-6">{children}</div>
      </StoreProvider>
    </Layout>
  );
};

export default HomePageLayout;
