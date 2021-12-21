import React from 'react'

import { SupabaseProvider } from '@/common/supabase/SupabaseProvider'
import { AmplitudeProvider } from '@/modules/core/amplitude/AmplitudeProvider'
import { MyThemeProvider } from '@/modules/theme/MyThemeProvider'

export interface AppProvidersProps {}

export const AppProviders: React.FunctionComponent<AppProvidersProps> = ({ children }) => {
	return (
		<SupabaseProvider>
			<AmplitudeProvider>
				<MyThemeProvider>{children}</MyThemeProvider>
			</AmplitudeProvider>
		</SupabaseProvider>
	)
}
