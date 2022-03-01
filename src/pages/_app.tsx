import '@/styles/globals.css';

import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider as NextThemeProvider } from 'next-themes';
import { SWRConfig } from 'swr';

import GlobalStoreProvider from '@/app/global-store-provider';
import ServicesProvider from '@/app/services-provider';
import { siteConfig } from '@/app/site-config';

async function fetcher<JSON = any>(
  input: RequestInfo,
  init: RequestInit,
): Promise<JSON> {
  const res = await fetch(input, init);
  return res.json();
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>{siteConfig.seo.title}</title>
        {/* Use minimum-scale=1 to enable GPU rasterization */}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
        />
      </Head>
      <NextThemeProvider attribute="class">
        <SWRConfig value={{ fetcher }}>
          <ServicesProvider>
            <GlobalStoreProvider>
              <Component {...pageProps} />
            </GlobalStoreProvider>
          </ServicesProvider>
        </SWRConfig>
      </NextThemeProvider>
    </>
  );
}

export default MyApp;
