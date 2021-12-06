import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import { useIsMobileDevice } from '@/common/hooks'
import { SearchBar } from '@/modules/search'

import { DefaultLogo } from './Logo'
import { MobilePageHeader } from './MobilePageHeader'
import { NavLinks } from './NavLinks'

export const DefaultPageHeader = () => {
	const router = useRouter()

	const isHomePage = router.pathname === '/'

	return (
		<header className={classNames('h-12', 'flex items-center gap-3 justify-between', 'px-6 py-4 md:px-12 md:py-8')}>
			<Link href={'/'}>
				<a className="cursor-pointer hover:text-primary-800">
					<DefaultLogo />
				</a>
			</Link>
			<div className="flex items-center gap-3">
				<NavLinks />
				{!isHomePage && <SearchBar size="sm" />}
			</div>
		</header>
	)
}

export const PageHeader = () => {
	const isMobile = useIsMobileDevice()

	if (isMobile) return <MobilePageHeader />

	return <DefaultPageHeader />
}
