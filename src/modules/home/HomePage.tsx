import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import { Page } from '@/common/components/Page'

export const HomePage = () => {
	const router = useRouter()

	useEffect(() => {
		router.push('/sources')
	}, [router])

	return <Page title="Home" description="Awesome Solana content"></Page>
}
