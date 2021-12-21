import { css } from '@emotion/react'
import classNames from 'classnames'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { useIsMobileDevice } from '@/common/hooks'
import { Page } from '@/components/Page'
import { useTotalSourcesCount } from '@/models/source/useTotalSourcesCount'
import { useStore } from '@/store/store'

import { formatToListOfPlurals } from './formatToListOfPlurals'
import { SourcesFeedGrid } from './SourcesFeedGrid'
import { SourcesFeedSidebar } from './SourcesFeedSidebar'

interface SourcesFeedPageProps {
	routerQuery: Record<string, string | string[] | undefined>
}

export const SourcesFeedPage: React.FC<SourcesFeedPageProps> = observer(() => {
	const { filterStore } = useStore()

	const isMobileDevice = useIsMobileDevice()

	const totalCount = useTotalSourcesCount()

	const caption =
		filterStore.all.length > 0 ? `All ${formatToListOfPlurals(filterStore.all)}` : `All sources (${totalCount})`

	return (
		<Page title={caption} description={caption}>
			{!isMobileDevice && <SourcesFeedSidebar />}
			<div
				css={css`
					display: flex;
					flex-direction: column;
					gap: 0.5rem;
					${!isMobileDevice &&
					css`
						position: absolute;
						right: 0;
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
					{filterStore.categories.length ? (
						filterStore.categories.map((id) => (
							<SourcesFeedGrid
								key={id}
								matchOpts={{ category: id }}
								spaceXClasses={'space-x-0 md:space-x-0'}
								spaceYClasses={'space-y-2 md:space-y-0'}
							/>
						))
					) : (
						<SourcesFeedGrid spaceXClasses={'space-x-0 md:space-x-0'} spaceYClasses={'space-y-2 md:space-y-0'} />
					)}
				</div>
			</div>
		</Page>
	)
})
