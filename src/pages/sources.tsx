import { useRouter } from 'next/router'

import { SourcesFeed } from '@/modules/sources'

export default function SourcesPage() {
	const router = useRouter()

	return (
		<>
			<SourcesFeed routerQuery={router.query} />
		</>
	)
}
