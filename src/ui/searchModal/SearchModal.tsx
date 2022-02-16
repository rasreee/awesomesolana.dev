import { Modal } from '@/ui/modal';

import SearchBar from './SearchBar';
import { useSearchModal } from './SearchModalContext';
import SearchResults from './SearchResults';

const SearchModal = () => {
  const { isOpen, onRequestClose } = useSearchModal();

  return (
    <Modal {...{ isOpen, onRequestClose }}>
      <SearchBar />
      <div className="h-[1px] bg-base-200 dark:bg-base-200 dark:opacity-10" />
      <SearchResults />
    </Modal>
  );
};

export default SearchModal;
