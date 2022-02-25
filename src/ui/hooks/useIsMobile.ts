import { useMemo } from 'react';

import { useWindowDimensions } from './useWindowDimensions';

export function useIsMobile() {
  const { width } = useWindowDimensions();
  return useMemo(() => width && width <= 700, [width]);
}
