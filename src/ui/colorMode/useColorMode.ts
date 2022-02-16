import React from 'react';

import invariant from '@/lib/invariant';

import { ColorModeContext, IColorModeContext } from './ColorModeContext';

export function useColorMode(): IColorModeContext {
  const context = React.useContext(ColorModeContext);
  invariant(context);
  return context;
}
