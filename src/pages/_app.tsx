import '@/styles/globals.css';
import '@/styles/colors.css';

import { AppProps } from 'next/app';
import Head from 'next/head';

import AppLayout from '@/app/AppLayout';
import ExternalProviders from '@/app/ExternalProviders';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </Head>
      <ExternalProviders>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </ExternalProviders>
    </>
  );
}

export default MyApp;
