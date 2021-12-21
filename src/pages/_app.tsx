import '@/modules/styles/index.css'

import { AppProps } from 'next/app'
import React from 'react'

import { AppShell } from '@/app/AppShell'
import { store, StoreContext } from '@/store/store'

function App({ Component, pageProps }: AppProps) {
	return (
		<StoreContext.Provider value={store}>
			<AppShell>
				<Component {...pageProps} />
			</AppShell>
		</StoreContext.Provider>
	)
}

export default App
