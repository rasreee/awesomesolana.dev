import { Divider } from '@/ui/divider';
import { Modal } from '@/ui/modal';

import SearchBar from './SearchBar';
import { useSearchModal } from './SearchModalContext';
import SearchResults from './SearchResults';

const SearchModal = () => {
  const { isOpen, onRequestClose, isRequesting, hits, onSelect } =
    useSearchModal();

  return (
    <Modal {...{ isOpen, onRequestClose }}>
      <SearchBar />
      {!isRequesting && (
        <>
          <Divider className="bg-surface-1" />
          <SearchResults hits={hits} onSelect={onSelect} />
        </>
      )}
    </Modal>
  );
};

export default SearchModal;
