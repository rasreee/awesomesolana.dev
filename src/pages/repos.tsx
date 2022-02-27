import dynamic from 'next/dynamic';

const Repos = dynamic(() => import('@/modules/repos/repos-page'));

export default Repos;
