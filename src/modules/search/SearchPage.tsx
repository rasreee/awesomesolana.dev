import { ReposSearchBox } from './ReposSearchBox';
import { Results } from './Results';
import { TagTypeModal } from './tags/TagTypeModal';
import { TagTypesControls } from './tags/TagTypesControls';

export const SearchPage = function SearchPage() {
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
