import '@/styles/globals.css';
// !STARTERCONF This is for demo purposes, remove @/styles/colors.css import immediately
import '@/styles/colors.css';

import { ThemeProvider as EmotionThemeProvider } from '@emotion/react';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import GlobalStyles from '@/ui/emotion/GlobalStyles';
import { theme } from '@/ui/emotion/theme';
import { SearchModalProvider, SearchResultData } from '@/ui/searchModal';

/**
 * !STARTERCONF info
 * ? `Layout` component is called in every page using `np` snippets. If you have consisten layout across all page, you can add it here too
 */

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const handleSelect = (selectedItem: SearchResultData) => {
    console.log('Selected item: ' + selectedItem);
    router.push(`/hits/${selectedItem.id}`);
  };

  return (
    <NextThemeProvider attribute="class">
      <EmotionThemeProvider theme={theme}>
        <GlobalStyles />
        <SearchModalProvider onSelect={handleSelect}>
          <Component {...pageProps} />
        </SearchModalProvider>
      </EmotionThemeProvider>
    </NextThemeProvider>
  );
}

export default MyApp;
