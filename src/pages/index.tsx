import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { Page } from '@/components/Page'

export default function HomePage() {
	const router = useRouter()

	useEffect(() => {
		router.push('/sources')
	}, [router])

	return <Page title="Home" description="Awesome Solana content"></Page>
}
