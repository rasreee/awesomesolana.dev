import React from 'react';

import { isBrowser } from '@/lib/environment';

const isMobile = (): boolean => {
  if (isBrowser()) {
    try {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );
    } catch (error) {
      console.log(error);

      return false;
    }
  } else {
    return false;
  }
};

export function useIsMobile() {
  return React.useMemo(isMobile, []);
}
