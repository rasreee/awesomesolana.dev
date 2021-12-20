import '@/modules/styles/index.css'

import { AppProps } from 'next/app'
import React from 'react'

import { AppProviders } from '@/app/AppProviders'

function App({ Component, pageProps }: AppProps) {
	return (
		<AppProviders>
			<Component {...pageProps} />
		</AppProviders>
	)
}

export default App
