import { css } from '@emotion/react'
import classNames from 'classnames'
import React from 'react'

import { Page } from '@/common/components'
import { useIsMobileDevice } from '@/common/hooks'
import { formatToListOfPlurals } from '@/common/utils'
import { useTotalSourcesCount } from '@/models/source'

import { useSourcesFeed } from './SourcesFeedContext'
import { SourcesFeedGrid } from './SourcesFeedGrid'
import { SourcesFeedSidebar } from './SourcesFeedSidebar'

export const SourcesFeed: React.FunctionComponent = () => {
	const isMobileDevice = useIsMobileDevice()
	const { sourceTypes } = useSourcesFeed()
	const totalCount = useTotalSourcesCount()

	const caption = sourceTypes.length > 0 ? `All ${formatToListOfPlurals(sourceTypes)}` : `All sources (${totalCount})`

	return (
		<Page title={caption} description={caption}>
			<div className="flex justify-start w-full">
				{!isMobileDevice && <SourcesFeedSidebar />}
				<div
					css={css`
						display: flex;
						flex-direction: column;
						gap: 0.5rem;
						${isMobileDevice &&
						css`
							position: absolute;
							right: 3rem;
							width: var(--page-right-width);
							max-width: var(--page-right-width);
						`}
					`}
				>
					{!isMobileDevice && (
						<div className={classNames('flex', 'items-center justify-between', 'py-2', 'px-5 md:px-2')}>
							<h1 className="text-gray-800 text-lg uppercase font-bold">{caption}</h1>
						</div>
					)}
					<div className="mobile:py-2">
						{sourceTypes.length ? (
							sourceTypes.map((type) => (
								<SourcesFeedGrid
									key={type}
									sourceType={type}
									spaceXClasses={'space-x-0 md:space-x-0'}
									spaceYClasses={'space-y-2 md:space-y-0'}
								/>
							))
						) : (
							<SourcesFeedGrid spaceXClasses={'space-x-0 md:space-x-0'} spaceYClasses={'space-y-2 md:space-y-0'} />
						)}
					</div>
				</div>
			</div>
		</Page>
	)
}
