import dynamic from 'next/dynamic';

const Home = dynamic(() => import('@/modules/home/home-page'));

export default Home;
