import { useState } from 'react';

import { uniques } from '@/common/utils';

export function useSelections<T = string>(initialSelections: T[] = []) {
  const [selections, setSelections] = useState<T[]>(initialSelections);

  const toggleSelection = (item: T) => {
    if (getIsExpanded(item))
      return setSelections((prev) => prev.filter((item) => item !== item));

    setSelections((prev) => uniques([...prev, item]));
  };

  const getIsExpanded = (item: T): boolean => {
    return selections.includes(item);
  };

  return { toggleSelection, getIsExpanded, selections };
}
