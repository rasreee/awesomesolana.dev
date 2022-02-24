import '@/styles/globals.css';
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { SearchProvider } from '@/modules/search';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <NextThemeProvider attribute="class">
        <SearchProvider>
          <Component {...pageProps} />
        </SearchProvider>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
