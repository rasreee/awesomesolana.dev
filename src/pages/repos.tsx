import dynamic from 'next/dynamic';

import PageLayout from '@/layouts/page-layout';

const ReposPage = dynamic(() => import('@/modules/repos/repos-page'));

const Repos = () => {
  return (
    <PageLayout title="Repos">
      <ReposPage />
    </PageLayout>
  );
};

export default Repos;
