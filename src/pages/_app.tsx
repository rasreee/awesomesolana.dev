import '@/styles/globals.css';
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import { AppProvider } from '@/app/AppContext';
import AppLayout from '@/app/AppLayout';
import { fetcher } from '@/common/utils';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <NextThemeProvider attribute="class">
        <SWRConfig value={{ fetcher }}>
          <AppProvider>
            <AppLayout>
              <Component {...pageProps} />
            </AppLayout>
          </AppProvider>
        </SWRConfig>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
