import dynamic from 'next/dynamic';

import { RepoFilters } from './repo-filters/repo-filters';
import { ReposSearchBox } from './repos-search-box';

const ReposResults = dynamic(() => import('./repo-results/repos-results'));
const RepoFilterTypeModal = dynamic(
  () => import('./repo-filters/repo-filter-type-modal'),
);

const ReposPage = function ReposPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <ReposSearchBox />
        <RepoFilters />
        <RepoFilterTypeModal />
      </div>
      <ReposResults />
    </>
  );
};

export default ReposPage;
