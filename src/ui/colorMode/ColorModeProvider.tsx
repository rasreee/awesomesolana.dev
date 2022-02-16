import React, { useState } from 'react';

import { ColorModeContext } from './ColorModeContext';
import { ColorMode } from './types';

export interface ColorModeProviderProps {
  children: React.ReactNode;
  initialMode?: ColorMode;
}

export default function ColorModeProvider({
  children,
  initialMode = 'light',
}: ColorModeProviderProps) {
  const [mode, setMode] = useState<ColorMode>(initialMode);

  const toggleColorMode = React.useCallback(
    () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark')),
    [],
  );

  return (
    <ColorModeContext.Provider value={{ mode, toggle: toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
}
