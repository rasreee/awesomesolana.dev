import '@/styles/globals.css';
import '@/styles/colors.css';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { SearchProvider } from '@/modules/search';
import { theme } from '@/ui/emotion/theme';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemeProvider attribute="class">
      <EmotionThemeProvider theme={theme}>
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </EmotionThemeProvider>
    </NextThemeProvider>
  );
}

export default MyApp;
