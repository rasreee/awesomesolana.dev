import '@/modules/styles/index.css'

import { AppProps } from 'next/app'
import React from 'react'

import { MyThemeProvider } from '@/theme/MyThemeProvider'

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<MyThemeProvider>
				<Component {...pageProps} />
			</MyThemeProvider>
		</>
	)
}

export default App
