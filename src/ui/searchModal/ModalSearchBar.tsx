import { SearchInput } from '../SearchInput';
import { StatefulSearchIcon } from '../StatefulSearchIcon';
import { useSearchModal } from './SearchModalContext';

const ModalSearchBar = () => {
  const { query, setQuery, isRequesting } = useSearchModal();

  return (
    <div className="flex items-center gap-1 px-5 py-2">
      <StatefulSearchIcon isRequesting={isRequesting} />
      <SearchInput
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.currentTarget.value)}
      />
    </div>
  );
};

export default ModalSearchBar;
