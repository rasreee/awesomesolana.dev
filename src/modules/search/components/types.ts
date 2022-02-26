import { FilterCategory } from '@modules/tags';

export interface CategoryFiltersProps {
  expand: (category: FilterCategory) => void;
  category: FilterCategory;
  onClose: () => void;
}
