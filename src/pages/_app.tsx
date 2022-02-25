import '@/styles/globals.css';
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider as NextThemeProvider } from 'next-themes';

import { AppProvider } from '@/app/AppContext';
import AppLayout from '@/app/AppLayout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <NextThemeProvider attribute="class">
        <AppProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </AppProvider>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
