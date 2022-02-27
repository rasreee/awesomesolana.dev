import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/modules/home/home-page'));

(Home as any).Layout = dynamic(() => import('@/layouts/page-layout'));

export default Home;
