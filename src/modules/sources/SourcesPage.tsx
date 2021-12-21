import { useRouter } from 'next/router'
import React from 'react'

import { SourcesFeedProvider } from './SourcesFeedContext'
import { SourcesFeedPage } from './SourcesFeedPage'

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
