import { useRouter } from 'next/router'
import React from 'react'

import { SourceType } from '@/models/source'

import { Page } from '../common/Page'

export const normalizeQueryParam = <T extends string = string>(param: string | string[] | undefined): T => {
	return param as T
}

export const SourcesPage = () => {
	const router = useRouter()
	const sourceType = 'type' in router.query ? normalizeQueryParam<SourceType>(router.query.type) : 'All sources'
	const caption = `All ${sourceType.replace('-', ' ')}s`

	return (
		<Page title={sourceType} description={caption}>
			<h1>{caption}</h1>
		</Page>
	)
}
