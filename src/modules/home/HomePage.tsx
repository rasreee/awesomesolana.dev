import classNames from 'classnames'

import { Padding } from '@/common/atoms/Padding'
import { Page } from '@/common/components/Page'
import { useKeyCombo, useModal } from '@/common/hooks'
import { SOURCE_TYPES } from '@/models/source'
import { SearchBar, SearchModal } from '@/modules/search'
import { SourcesSection } from '@/modules/sources/SourcesSection'

export const HomePage = () => {
	const { open: openModal, bind: bindModal } = useModal()
	useKeyCombo('Meta+k', openModal)

	return (
		<Page title="Home" description="Awesome Solana content">
			{/* Inner content */}
			<div className={classNames('grid', 'space-y-6 md:space-y-12', 'py-2 md:py-4', 'mx-auto')}>
				<Padding px={3} py={8}>
					<SearchBar />
				</Padding>
				{SOURCE_TYPES.map((sourceType) => (
					<Padding key={sourceType} px={3}>
						<SourcesSection sourceType={sourceType} />
					</Padding>
				))}
			</div>
			<SearchModal {...bindModal} />
		</Page>
	)
}
