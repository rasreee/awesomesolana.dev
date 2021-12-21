import { useRouter } from 'next/router'

import { SourcesFeed, SourcesFeedProvider } from '@/modules/sources'

const SourcesPage = () => {
	const router = useRouter()

	return (
		<>
			<SourcesFeedProvider routerQuery={router.query}>
				<SourcesFeed />
			</SourcesFeedProvider>
		</>
	)
}

export default SourcesPage
