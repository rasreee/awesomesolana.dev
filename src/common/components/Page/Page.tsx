import classNames from 'classnames'
import { FC } from 'react'

import { SearchModalController } from '@/modules/search/SearchModalController'

import { preview } from './constants'
import { Meta } from './Meta'
import { PageHeader } from './PageHeader'

export type PageProps = {
	title: string
	description: string
	image?: string
}

const Page: FC<PageProps> = ({ title, description, image = preview, children }) => {
	return (
		<>
			<Meta {...{ title, description, image }} />
			<main
				className={classNames(
					'flex flex-col items-center',
					'relative',
					'p-0 pb-12',
					'gap-3',
					'overflow-x-hidden',
					'min-h-screen w-screen'
				)}
			>
				{/* Inner container */}
				<div className="w-full">
					{/* Header */}
					<PageHeader />
					{/* Content below header */}
					<div className={classNames('w-full', 'md:max-w-screen-lg', 'mx-auto')}>{children}</div>
				</div>
				<SearchModalController />
			</main>
		</>
	)
}

export { Page }
