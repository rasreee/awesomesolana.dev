import React from 'react'

import { SupabaseProvider } from '@/common/supabase/SupabaseProvider'
import { AppConfig } from '@/common/utils/AppConfig'
import { AmplitudeProvider } from '@/modules/core/amplitude/AmplitudeProvider'
import { MyThemeProvider } from '@/modules/theme/MyThemeProvider'

export const AppShell: React.FunctionComponent = ({ children }) => {
	return (
		<div id={AppConfig.elementId}>
			<SupabaseProvider>
				<AmplitudeProvider>
					<MyThemeProvider>{children}</MyThemeProvider>
				</AmplitudeProvider>
			</SupabaseProvider>
		</div>
	)
}
