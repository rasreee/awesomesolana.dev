import dynamic from 'next/dynamic';

import PageLayout from '@/layouts/page-layout';

const HomePage = dynamic(() => import('@/modules/home/home-page'));

const Home = () => {
  return (
    <PageLayout title="Home">
      <HomePage />
    </PageLayout>
  );
};

export default Home;
