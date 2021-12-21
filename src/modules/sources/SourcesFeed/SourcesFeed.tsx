import { css } from '@emotion/react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useIsMobileDevice } from '@/common/hooks'
import { formatToListOfPlurals } from '@/common/utils'
import { Page } from '@/components/Page'
import { useTotalSourcesCount } from '@/models/source'
import { FilterType } from '@/store/filter'
import { useStore } from '@/store/store'

import { SourcesFeedGrid } from './SourcesFeedGrid'
import { SourcesFeedSidebar } from './SourcesFeedSidebar'

export interface SourcesFeedProps {
	routerQuery: Record<string, string | string[] | undefined>
}

export const SourcesFeed: React.FC<SourcesFeedProps> = observer(() => {
	const { filterStore } = useStore()

	const isMobileDevice = useIsMobileDevice()

	const totalCount = useTotalSourcesCount()

	const caption =
		Object.values(filterStore.all).flat().length > 0
			? `All ${formatToListOfPlurals(Object.values(filterStore.all).flat())}`
			: `All sources (${totalCount})`

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
						{filterStore.all.categories.length ? (
							filterStore.all.categories.map((id) => (
								<SourcesFeedGrid
									key={id}
									filter={{ type: FilterType.Categories, id }}
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
})
