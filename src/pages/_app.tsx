import '@/modules/styles/index.css'

import { AppProps } from 'next/app'
import React from 'react'

import { SupabaseProvider } from '@/common/supabase/SupabaseProvider'
import { MyThemeProvider } from '@/theme/MyThemeProvider'

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<SupabaseProvider>
				<MyThemeProvider>
					<Component {...pageProps} />
				</MyThemeProvider>
			</SupabaseProvider>
		</>
	)
}

export default App
