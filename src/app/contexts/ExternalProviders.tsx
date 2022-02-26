import { ThemeProvider as NextThemeProvider } from 'next-themes';
import React from 'react';
import { SWRConfig } from 'swr';

import { fetcher } from '@/lib/fetcher';

const ExternalProviders = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <NextThemeProvider attribute="class">
      <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
    </NextThemeProvider>
  );
};

export default ExternalProviders;
