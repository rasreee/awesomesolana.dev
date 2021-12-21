import classNames from 'classnames'
import React from 'react'

import { Page } from '@/common/components/Page'
import { AllSourcesFeed } from '@/modules/sources/AllSourcesFeed'

export const HomePage = () => {
	return (
		<Page title="Home" description="Awesome Solana content">
			<AllSourcesFeed limit={3} />
		</Page>
	)
}
