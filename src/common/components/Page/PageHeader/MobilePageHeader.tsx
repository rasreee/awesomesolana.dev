import classNames from 'classnames'
import { useRouter } from 'next/router'

import { MobileNav } from './MobileNav'
import { NavLinks } from './NavLinks'

export const MobilePageHeader = () => {
	const router = useRouter()

	const isHomePage = router.pathname === '/'

	if (!isHomePage) {
		return (
			<header className={classNames('px-6 py-3')}>
				<MobileNav />
			</header>
		)
	}

	return (
		<header className={classNames('h-12', 'flex justify-between gap-2')}>
			<NavLinks />
		</header>
	)
}
