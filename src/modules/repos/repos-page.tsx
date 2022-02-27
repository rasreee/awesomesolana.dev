import dynamic from 'next/dynamic';

import Filters from '@/modules/filters/filters';

import { ReposSearchBox } from './repos-search-box';

const ReposResults = dynamic(() => import('./repo-results/repos-results'));

const ReposPage = function ReposPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <ReposSearchBox />
        <Filters />
      </div>
      <ReposResults />
    </>
  );
};

export default ReposPage;
