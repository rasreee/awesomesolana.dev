import React from 'react';

import { ColorMode } from './ColorMode';

export interface IColorModeContext {
  mode: ColorMode;
  toggle: () => void;
}

export const ColorModeContext = React.createContext<
  IColorModeContext | undefined
>(undefined);
