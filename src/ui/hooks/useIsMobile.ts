import { useBreakpoints } from '../responsive';

export function useIsMobile(): boolean {
  return Boolean(useBreakpoints()?.isSmall);
}
