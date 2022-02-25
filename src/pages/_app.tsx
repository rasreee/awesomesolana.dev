import '@/styles/globals.css';
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { AppProviders } from '@/contexts/AppProviders';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <NextThemeProvider attribute="class">
        <AppProviders>
          <Component {...pageProps} />
        </AppProviders>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
