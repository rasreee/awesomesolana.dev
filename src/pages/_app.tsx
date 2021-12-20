import '@/modules/styles/index.css'

import { AppProps } from 'next/app'
import React from 'react'

import { AppShell } from '@/app/AppShell'

function App({ Component, pageProps }: AppProps) {
	return (
		<AppShell>
			<Component {...pageProps} />
		</AppShell>
	)
}

export default App
