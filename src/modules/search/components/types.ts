import { FilterCategory } from '@/modules/tags';

export interface CategoryFiltersProps {
  expand: (category: FilterCategory) => void;
  category: FilterCategory;
  onRequestClose: () => void;
}
