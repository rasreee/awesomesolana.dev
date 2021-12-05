import classNames from 'classnames'
import Link from 'next/link'
import React, { FC } from 'react'

import { Main } from '@/ui/atoms/Main'

import { Logo } from '../Logo'
import { preview } from './constants'
import { Meta } from './Meta'
import { NavLinks } from './NavLinks'

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
					<header className={classNames('h-12', 'flex items-center gap-3 justify-between px-6 py-4 md:px-12 md:py-8')}>
						<Link href={'/'}>
							<a className="cursor-pointer hover:text-primary-800">
								<Logo />
							</a>
						</Link>
						<NavLinks />
					</header>
					{/* Content below header */}
					<div className={classNames('w-full', 'md:max-w-screen-lg', 'mx-auto')}>{children}</div>
				</div>
			</Main>
		</>
	)
}

export { Page }
