import '@/modules/styles/index.css'

import { AppProps } from 'next/app'
import React from 'react'

import { SupabaseProvider } from '@/common/supabase/SupabaseProvider'
import { InitialQueryProvider } from '@/modules/search/InitialQueryContext'
import { RecentsProvider } from '@/modules/search/RecentsContext'
import { MyThemeProvider } from '@/theme/MyThemeProvider'

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<SupabaseProvider>
				<MyThemeProvider>
					<InitialQueryProvider>
						<RecentsProvider>
							<Component {...pageProps} />
						</RecentsProvider>
					</InitialQueryProvider>
				</MyThemeProvider>
			</SupabaseProvider>
		</>
	)
}

export default App
