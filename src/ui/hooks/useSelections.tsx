import { useState } from 'react';

export function useSelections<T = string>(initialSelections: T[] = []) {
  const [selections, setSelections] = useState<T[]>(initialSelections);

  const getIsExpanded = (item: T): boolean => {
    return selections.includes(item);
  };

  const toggleSelection = (item: T) => {
    setSelections((prev) =>
      prev.includes(item) ? prev.filter((el) => el !== item) : [...prev, item],
    );
  };

  return { toggleSelection, getIsExpanded, selections };
}
