import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { useIsMobileDevice } from '@/common/hooks'
import { SearchBar } from '@/modules/search'

import { Logo } from './Logo'
import { NavLinks } from './NavLinks'

export const PageHeader = () => {
	const router = useRouter()
	const isMobile = useIsMobileDevice()

	const left = isMobile ? (
		<div />
	) : (
		<Link href={'/'}>
			<a className="cursor-pointer hover:text-primary-800">
				<Logo />
			</a>
		</Link>
	)

	const isHomePage = router.pathname === '/'

	const right = (
		<div className="flex items-center gap-3">
			{!isMobile && <NavLinks />}
			{!isHomePage && <SearchBar size="sm" />}
		</div>
	)

	return (
		<header className={classNames('h-12', 'flex items-center gap-3 justify-between px-6 py-4 md:px-12 md:py-8')}>
			{left}
			{right}
		</header>
	)
}
