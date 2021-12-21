import { useRouter } from 'next/router'
import React from 'react'

import { NavLink, NavLinkProps } from '@/common/components'
import { SOURCE_TYPES } from '@/models/source'
import { formatSourceTypeLabel } from '@/models/source/formatSourceTypeLabel'
import { getSourcesRoutePath } from '@/modules/sources/getSourcesRoutePath'

const navLinks: Omit<NavLinkProps, 'children'>[] = SOURCE_TYPES.map((sourceType) => ({
	id: sourceType,
	href: getSourcesRoutePath([sourceType]),
	label: formatSourceTypeLabel(sourceType)
}))

const NavLinks: React.FC = () => {
	const router = useRouter()

	return (
		<nav className="flex items-center gap-3">
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

export { NavLinks }
