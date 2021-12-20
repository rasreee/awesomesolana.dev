import React from 'react'

import { AppConfig } from '@/common/utils/AppConfig'

import { AppProviders } from './AppProviders'

export interface AppShellProps {}

export const AppShell: React.FunctionComponent<AppShellProps> = ({ children }) => {
	return (
		<div id={AppConfig.elementId}>
			<AppProviders>{children}</AppProviders>
		</div>
	)
}
