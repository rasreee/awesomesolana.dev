import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useIsMobileDevice } from '@/common/hooks'
import { SearchFeature } from '@/modules/search'

import { DefaultLogo } from './Logo'

export const DefaultPageHeader = () => {
	return (
		<header className={classNames('h-12', 'flex items-center gap-3 justify-between', 'px-6 py-4 md:px-12 md:py-8')}>
			<Link href={'/'}>
				<a className="cursor-pointer hover:text-primary-800">
					<DefaultLogo />
				</a>
			</Link>
			<SearchFeature />
		</header>
	)
}

export const MobilePageHeader = () => {
	const router = useRouter()

	const isHomePage = router.pathname === '/'

	if (!isHomePage) {
		return <header className={classNames('px-6 py-3')}></header>
	}

	return <header className={classNames('h-12', 'flex justify-between gap-2')}></header>
}

export const Header = () => {
	const isMobile = useIsMobileDevice()

	if (isMobile) return <MobilePageHeader />

	return <DefaultPageHeader />
}
