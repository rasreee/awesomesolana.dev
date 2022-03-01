import { useTheme } from 'next-themes';
import React from 'react';

import { IColorModeContext } from './color-mode-context';
import { ColorMode } from './types';

export function useColorMode(): IColorModeContext {
  const { resolvedTheme, setTheme } = useTheme();

  const toggle = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  const mode = React.useMemo(() => resolvedTheme as ColorMode, [resolvedTheme]);

  return { mode, toggle };
}
