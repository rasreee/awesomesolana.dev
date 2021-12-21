import classNames from 'classnames'
import React, { FC } from 'react'

import styled from '@/styled'

import { Header } from './Header'
import { Meta } from './Meta'

export type PageProps = {
	title: string
	description: string
	image?: string
}

export const Content = styled.div`
	max-width:  max-width: 1024px;
	margin: 0 auto;
`

const Page: FC<PageProps> = ({ title, description, image, children }) => {
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
					<Header />
					{/* Content below header */}
					<Content>{children}</Content>
				</div>
			</main>
		</>
	)
}

export { Page }
