import '@/styles/globals.css';
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

import AppLayout from '@/app/AppLayout';
import AppStateProvider from '@/app/contexts/AppStateProvider';
import ExternalProviders from '@/app/contexts/ExternalProviders';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <ExternalProviders>
        <AppStateProvider>
          <AppLayout>
            <Component {...pageProps} />
          </AppLayout>
        </AppStateProvider>
      </ExternalProviders>
    </>
  );
}

export default MyApp;
