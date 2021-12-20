import classNames from 'classnames'
import Link from 'next/link'

import { SearchFeature } from '@/modules/search/SearchFeature'

import { DefaultLogo } from './Logo'
import { NavLinks } from './NavLinks'

export const DefaultPageHeader = () => {
	return (
		<header className={classNames('h-12', 'flex items-center gap-3 justify-between', 'px-6 py-4 md:px-12 md:py-8')}>
			<Link href={'/'}>
				<a className="cursor-pointer hover:text-primary-800">
					<DefaultLogo />
				</a>
			</Link>
			<SearchFeature />
			<div className="flex items-center gap-3">
				<NavLinks />
			</div>
		</header>
	)
}
