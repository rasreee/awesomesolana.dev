import { css } from '@emotion/react'
import classNames from 'classnames'
import { FC } from 'react'

import { spacing } from '@/ui/foundations'
import styled from '@/ui/styled'

import { preview } from './constants'

const Main = styled.main`
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: ${spacing(3)};
	padding: 0;
	position: relative;
	overflow-x: hidden;
	min-height: 100vh;
	width: 100vw;
	padding-bottom: ${spacing(12)};
	${({ theme }) =>
		css`
			background-color: ${theme.colors.bg};
		`}
`

import { Meta } from './Meta'
import { PageHeader } from './PageHeader'

export type PageProps = {
	title: string
	description: string
	image?: string
}

export const pageHeaderProps = {}

const Page: FC<PageProps> = ({ title, description, image = preview, children }) => {
	return (
		<>
			<Meta {...{ title, description, image }} />
			<Main>
				{/* Inner container */}
				<div className="w-full">
					{/* Header */}
					<PageHeader />
					{/* Content below header */}
					<div className={classNames('w-full', 'md:max-w-screen-lg', 'mx-auto')}>{children}</div>
				</div>
			</Main>
		</>
	)
}

export { Page }
