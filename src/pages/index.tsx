import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/modules/home/HomePage'));

(Home as any).Layout = dynamic(() => import('@/layouts/PageLayout'));

export default Home;
