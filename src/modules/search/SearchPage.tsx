import dynamic from 'next/dynamic';

import { ReposSearchBox } from './ReposSearchBox';
import { TagTypesControls } from './tags/TagTypesControls';

const Results = dynamic(() => import('./Results'));
const TagTypeModal = dynamic(() => import('./tags/TagTypeModal'));

const SearchPage = function SearchPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <ReposSearchBox />
        <TagTypesControls />
        <TagTypeModal />
      </div>
      <Results />
    </>
  );
};

export default SearchPage;
