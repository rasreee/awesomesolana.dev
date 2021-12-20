import React from 'react'

import { SupabaseProvider } from '@/common/supabase/SupabaseProvider'
import { MyThemeProvider } from '@/theme/MyThemeProvider'

export interface AppProvidersProps {}

export const AppProviders: React.FunctionComponent<AppProvidersProps> = ({ children }) => {
	return (
		<SupabaseProvider>
			<MyThemeProvider>{children}</MyThemeProvider>
		</SupabaseProvider>
	)
}
