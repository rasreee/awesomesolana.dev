import '@/modules/styles/index.css'

import { AppProps } from 'next/app'
import React from 'react'

import { InitialQueryProvider } from '@/modules/search/InitialQueryContext'
import { RecentsProvider } from '@/modules/search/RecentsContext'
import { MyThemeProvider } from '@/theme/MyThemeProvider'

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<MyThemeProvider>
				<InitialQueryProvider>
					<RecentsProvider>
						<Component {...pageProps} />
					</RecentsProvider>
				</InitialQueryProvider>
			</MyThemeProvider>
		</>
	)
}

export default App
