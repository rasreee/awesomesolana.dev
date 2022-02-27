import dynamic from 'next/dynamic';

const Repos = dynamic(() => import('@/modules/repos/repos-page'));

(Repos as any).Layout = dynamic(() => import('@/layouts/page-layout'));

export default Repos;
