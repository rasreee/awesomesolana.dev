import { useRouter } from 'next/router'
import React from 'react'

import { SourcesFeedProvider } from './SourcesFeed/SourcesFeedContext'
import { SourcesFeedPage } from './SourcesFeed/SourcesFeedPage'

export const SourcesPage = () => {
	const router = useRouter()

	return (
		<>
			<SourcesFeedProvider routerQuery={router.query}>
				<SourcesFeedPage />
			</SourcesFeedProvider>
		</>
	)
}
