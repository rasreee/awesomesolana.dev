import { useRouter } from 'next/router'
import React from 'react'

import { SOURCE_TYPES } from '@/models/source'
import { formatSourceTypeLabel } from '@/models/source/formatSourceTypeLabel'
import { getSourcesRoutePath } from '@/modules/sources/SourcesFeed/getSourcesRoutePath'

import { NavLink, NavLinkProps } from '../NavLink'

const navLinks: Omit<NavLinkProps, 'children'>[] = SOURCE_TYPES.map((sourceType) => ({
	id: sourceType,
	href: getSourcesRoutePath([sourceType]),
	label: formatSourceTypeLabel(sourceType)
}))

export interface MobileNavProps {}

export const MobileNav: React.FunctionComponent<MobileNavProps> = (props) => {
	const router = useRouter()

	return (
		<nav className="flex items-center gap-3 overflow-x-scroll">
			<NavLink href="/" label="Home">
				Home
			</NavLink>
			{navLinks.map((link) => (
				<li key={link.id}>
					<NavLink {...link} isActive={link.href === router.pathname}>
						{link.label}
					</NavLink>
				</li>
			))}
		</nav>
	)
}
