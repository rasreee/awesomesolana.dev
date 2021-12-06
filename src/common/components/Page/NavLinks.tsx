import { useRouter } from 'next/router'
import React from 'react'

import { NavLink, NavLinkProps } from '@/common/components'
import { SOURCE_TYPES } from '@/models/source'
import { formatSourceTypeLabel } from '@/models/source/formatSourceTypeLabel'

const navLinks: Omit<NavLinkProps, 'children'>[] = SOURCE_TYPES.map((sourceType) => ({
	id: sourceType,
	href: `/sources?type=${sourceType}`,
	label: formatSourceTypeLabel(sourceType)
}))

const NavLinks: React.FC = () => {
	const router = useRouter()

	return (
		<>
			{navLinks.map((link) => (
				<li key={link.id}>
					<NavLink {...link} isActive={link.href === router.pathname}>
						{link.label}
					</NavLink>
				</li>
			))}
		</>
	)
}

export { NavLinks }
