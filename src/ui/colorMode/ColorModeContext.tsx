import React from 'react';

import { ColorMode } from './types';

export interface IColorModeContext {
  mode: ColorMode;
  toggle: () => void;
}

export const ColorModeContext = React.createContext<
  IColorModeContext | undefined
>(undefined);
