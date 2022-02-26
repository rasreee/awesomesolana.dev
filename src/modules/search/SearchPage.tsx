import { Results } from './Results';
import { SearchBox } from './SearchBox';
import { TagTypeModal } from './tags/TagTypeModal';
import { TagTypesControls } from './tags/TagTypesControls';

export const SearchPage = function SearchPage() {
  return (
    <>
      <div className="flex flex-col gap-2">
        <SearchBox />
        <TagTypesControls />
        <TagTypeModal />
      </div>
      <Results />
    </>
  );
};
