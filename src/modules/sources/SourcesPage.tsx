import classNames from 'classnames'
import { useRouter } from 'next/router'

import { Page } from '@/common/components/Page'
import { SourceType } from '@/models/source'

import { SourcesFeedGrid } from './SourcesFeedGrid'

export const normalizeQueryParam = <T extends string = string>(param: string | string[] | undefined): T => {
	return param as T
}

export const SourcesPage = () => {
	const router = useRouter()
	const sourceType = 'type' in router.query ? normalizeQueryParam<SourceType>(router.query.type) : null
	const caption = sourceType ? `All ${sourceType.replace('-', ' ')}s` : 'All sources'

	return (
		<Page title={caption} description={caption}>
			<div className={classNames('grid', 'space-y-2')}>
				<div className={classNames('flex', 'items-center justify-between', 'py-2', 'px-5 md:px-2')}>
					<h1 className="text-gray-800 text-lg uppercase font-bold">{caption}</h1>
				</div>
				{sourceType && (
					<SourcesFeedGrid
						sourceType={sourceType}
						spaceXClasses={'space-x-0 md:space-x-0'}
						spaceYClasses={'space-y-2 md:space-y-0'}
					/>
				)}
			</div>
		</Page>
	)
}
