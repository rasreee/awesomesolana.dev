import { useRouter } from 'next/router'

import { SourcesFeed, SourcesFeedProvider } from '@/modules/sources'

export default function SourcesPage() {
	const router = useRouter()

	return (
		<>
			<SourcesFeedProvider routerQuery={router.query}>
				<SourcesFeed routerQuery={router.query} />
			</SourcesFeedProvider>
		</>
	)
}
