import { useEffect, useState } from 'react';

import { useWindowDimensions } from '@/ui/hooks/useWindowDimensions';

import { breakpoints } from './breakpoints';
import { emToPx } from './helpers';

type UseBreakpointsResult = {
  isSmall: boolean;
  isMedium: boolean;
  isLarge: boolean;
};

export function useBreakpoints(): UseBreakpointsResult | null {
  const { width } = useWindowDimensions();

  const [result, setResult] = useState<UseBreakpointsResult | null>(null);

  useEffect(() => {
    if (typeof width !== 'number' || result) return;

    const newResult = {
      isSmall: Boolean(width && width <= emToPx(breakpoints.sm)),
      isMedium: Boolean(
        width &&
          width > emToPx(breakpoints.sm) &&
          width <= emToPx(breakpoints.md),
      ),
      isLarge: Boolean(width && width > emToPx(breakpoints.md)),
    };

    setResult(newResult);
  }, [width]);

  return result;
}
