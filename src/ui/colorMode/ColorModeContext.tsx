import { ColorMode } from './types';

export interface IColorModeContext {
  mode: ColorMode;
  toggle: () => void;
}
