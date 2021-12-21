import '@/modules/styles/index.css'

import { Provider } from 'mobx-react'
import { AppProps } from 'next/app'
import React from 'react'

import { AppShell } from '@/app/AppShell'
import { useStore } from '@/store/useStore'

function App({ Component, pageProps }: AppProps) {
	const store = useStore(pageProps.initialState)

	return (
		<Provider store={store}>
			<AppShell>
				<Component {...pageProps} />
			</AppShell>
		</Provider>
	)
}

export default App
