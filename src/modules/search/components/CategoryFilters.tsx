import { FilterCategory } from '@/api/tags';
import { ResponsiveRender } from '@/ui/components';

import { CategoryFiltersBottomSheet } from './CategoryFiltersBottomSheet';
import { CategoryFiltersDropdown } from './CategoryFiltersDropdown';

export type CategoryFiltersProps = {
  category: FilterCategory;
  isOpen: boolean;
  onRequestClose: () => void;
};

export function CategoryFilters(props: CategoryFiltersProps) {
  return (
    <ResponsiveRender
      mobile={CategoryFiltersBottomSheet}
      aboveMobile={CategoryFiltersDropdown}
      props={props}
    />
  );
}
