import React, { useState } from 'react';

import { ColorMode } from './ColorMode';
import { ColorModeContext } from './ColorModeContext';

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
