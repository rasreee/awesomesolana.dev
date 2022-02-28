import dynamic from 'next/dynamic';
import { useState } from 'react';

import { StoreProvider } from '@/lib/mobx/store-context';
import { HomePageStore } from '@/modules/home/home-page-store';

const HomePage = dynamic(() => import('@/modules/home/home-page'));

const Home = () => {
  const [store] = useState(() => new HomePageStore());

  return (
    <StoreProvider store={store}>
      <HomePage />
    </StoreProvider>
  );
};

export default Home;
