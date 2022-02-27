import dynamic from 'next/dynamic';

import { FilterTypeMenuToggles } from './filter-type-menu-toggles';

const FilterTypeModal = dynamic(() => import('./filter-type-modal'));

const Filters = () => {
  return (
    <>
      <FilterTypeMenuToggles />
      <FilterTypeModal />
    </>
  );
};

export default Filters;
