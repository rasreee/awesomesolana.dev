import classNames from 'classnames'
import { useRouter } from 'next/router'

import { Page } from '@/common/components/Page'
import { useIsMobileDevice } from '@/common/hooks'
import { normalizeQueryParam } from '@/common/utils'
import { SourceType } from '@/models/source'
import { formatSourceTypeLabel } from '@/models/source/formatSourceTypeLabel'

import { SourcesFeedGrid } from './SourcesFeedGrid'

export const SourcesPage = () => {
	const router = useRouter()
	const sourceType = 'type' in router.query ? normalizeQueryParam<SourceType>(router.query.type) : null
	const caption = sourceType ? `All ${formatSourceTypeLabel(sourceType)}` : 'All sources'

	const isMobileDevice = useIsMobileDevice()

	return (
		<Page title={caption} description={caption}>
			<div className={classNames(!isMobileDevice && 'flex flex-col gap-2')}>
				{!isMobileDevice && (
					<div className={classNames('flex', 'items-center justify-between', 'py-2', 'px-5 md:px-2')}>
						<h1 className="text-gray-800 text-lg uppercase font-bold">{caption}</h1>
					</div>
				)}
				<div className="mobile:py-2">
					{sourceType && (
						<SourcesFeedGrid
							sourceType={sourceType}
							spaceXClasses={'space-x-0 md:space-x-0'}
							spaceYClasses={'space-y-2 md:space-y-0'}
						/>
					)}
				</div>
			</div>
		</Page>
	)
}
