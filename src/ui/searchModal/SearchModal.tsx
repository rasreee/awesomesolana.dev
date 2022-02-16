import { Divider } from '@/ui/divider';
import { Modal } from '@/ui/modal';

import SearchBar from './SearchBar';
import { useSearchModal } from './SearchModalContext';
import SearchResults from './SearchResults';

const SearchModal = () => {
  const { isOpen, onRequestClose } = useSearchModal();

  return (
    <Modal {...{ isOpen, onRequestClose }}>
      <SearchBar />
      <Divider className="bg-surface-1" />
      <SearchResults />
    </Modal>
  );
};

export default SearchModal;
