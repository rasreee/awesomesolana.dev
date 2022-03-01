import dynamic from 'next/dynamic';

import { FiltersPanel } from './filters-panel/filters-panel';

const FiltersModal = dynamic(() => import('./filters-modal/filters-modal'));

const Filters = () => {
  return (
    <>
      <FiltersPanel />
      <FiltersModal />
    </>
  );
};

export default Filters;
