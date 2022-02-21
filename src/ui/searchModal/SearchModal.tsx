import { Divider } from '@/ui/divider';
import { Modal } from '@/ui/modal';

import ModalSearchBar from './ModalSearchBar';
import { useSearchModal } from './SearchModalContext';
import SearchResults from './SearchResults';

const SearchModal = () => {
  const { isOpen, onRequestClose, isRequesting, hits, onSelect, query } =
    useSearchModal();

  return (
    <Modal className="mt-[30%] sm:mt-[10%]" {...{ isOpen, onRequestClose }}>
      <ModalSearchBar />
      {!isRequesting && query && (
        <>
          <Divider className="bg-surface-1" />
          <SearchResults hits={hits} onSelect={onSelect} />
        </>
      )}
    </Modal>
  );
};

export default SearchModal;
