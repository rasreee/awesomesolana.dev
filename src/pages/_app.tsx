import '@/styles/globals.css';
import '@/styles/colors.css';

import { fetcher } from '@utils/fetcher';
import { getSeo } from '@utils/seo';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { DefaultSeo } from 'next-seo';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import AppLayout from '@/app/AppLayout';

function MyApp({ Component, pageProps }: AppProps) {
  const seo = getSeo();

  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <DefaultSeo {...seo} />
      <NextThemeProvider attribute="class">
        <SWRConfig value={{ fetcher }}>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </SWRConfig>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
