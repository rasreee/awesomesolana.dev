import { useBreakpoints } from './use-breakpoints';

export function useIsMobile(): boolean {
  return Boolean(useBreakpoints()?.isSmall);
}
