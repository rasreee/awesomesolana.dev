import { useEffect, useMemo, useState } from 'react';

import { Project } from '@/api/projects';
import { Popover } from '@/ui/components';

import { Filters, MobileFilters } from './Filters';
import { SearchField, UseSearchField } from './SearchField';

export function SearchBox({
  searchField,
}: {
  searchField: UseSearchField<Project>;
}) {
  const [isFiltersMenuOpen, setIsFiltersMenuOpen] = useState(false);

  const toggleFiltersMenuOpen = () => {
    setIsFiltersMenuOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-2 sm:flex-row">
      <SearchField
        isFiltersMenuOpen={isFiltersMenuOpen}
        onShowFilters={toggleFiltersMenuOpen}
        {...searchField}
      />
      {isFiltersMenuOpen && (
        <FiltersMenu onRequestClose={toggleFiltersMenuOpen} />
      )}
    </div>
  );
}

export function FiltersMenu({
  onRequestClose,
}: {
  onRequestClose: () => void;
}) {
  const isMobile = useIsMobile();

  if (isMobile)
    return (
      <div className="relative">
        <Popover
          className="bg-surface w-full"
          isOpen={true}
          onRequestClose={onRequestClose}
        >
          <MobileFilters onRequestClose={onRequestClose} />
        </Popover>
      </div>
    );

  return (
    <div className="bg-surface sm:3/12 rounded-md lg:w-4/12">
      <Filters />
    </div>
  );
}

function getWindowDimensions() {
  let width = undefined;
  let height = undefined;

  if (typeof window !== 'undefined') {
    width = window.innerWidth;
    height = window.innerHeight;
  }

  return {
    width,
    height,
  };
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions(),
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}

export function useIsMobile() {
  const { width } = useWindowDimensions();
  return useMemo(() => width && width <= 700, [width]);
}
