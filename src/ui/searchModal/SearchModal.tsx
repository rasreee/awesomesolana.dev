import { Modal } from '@/ui/modal';

import SearchBar from './SearchBar';
import { useSearchModal } from './SearchModalContext';
import SearchResults from './SearchResults';

const SearchModal = () => {
  const { isOpen, onRequestClose } = useSearchModal();

  return (
    <Modal {...{ isOpen, onRequestClose }}>
      <SearchBar />
      <div className="bg-surface h-[1px] dark:opacity-10" />
      <SearchResults />
    </Modal>
  );
};

export default SearchModal;
