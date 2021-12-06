import classNames from 'classnames'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

import { Page } from '@/common/components/Page'
import { SourceType, useSourcesByType } from '@/models/source'

export const normalizeQueryParam = <T extends string = string>(param: string | string[] | undefined): T => {
	return param as T
}

type SourcesFeedProps = {
	sourceType: SourceType
}

export const SourcesFeed: FC<SourcesFeedProps> = ({ sourceType }) => {
	const { data: sources, isLoading } = useSourcesByType(sourceType)

	return (
		<>
			{isLoading && <div>Loading...</div>}
			{sources?.map((source) => (
				<div key={source.id}>{source.title}</div>
			))}
		</>
	)
}

export const SourcesPage = () => {
	const router = useRouter()
	const sourceType = 'type' in router.query ? normalizeQueryParam<SourceType>(router.query.type) : null
	const caption = sourceType ? `All ${sourceType.replace('-', ' ')}s` : 'All sources'

	return (
		<Page title={caption} description={caption}>
			<div className={classNames('grid', 'space-y-2')}>
				<div className={classNames('flex', 'items-center justify-between', 'py-2', 'px-5 md:px-12')}>
					<h1 className="text-gray-800 text-lg uppercase font-bold">{caption}</h1>
				</div>
				<div className={classNames('grid', 'content-center', 'space-y-2 md:space-y-0', 'space-x-0 md:space-x-4')}>
					{sourceType && <SourcesFeed sourceType={sourceType} />}
				</div>
			</div>
		</Page>
	)
}
