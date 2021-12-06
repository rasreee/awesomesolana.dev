import { useRouter } from 'next/router'
import React from 'react'

import { NavLink, NavLinkProps } from '@/common/components'

const navLinks: Omit<NavLinkProps, 'children'>[] = [
	{
		id: 'articles',
		href: `/sources?type=${'article'}`,
		label: 'Articles'
	},
	{
		id: 'repos',
		href: `/sources?type=${'github-repo'}`,
		label: 'Repos'
	},
	{
		id: 'whitepapers',
		href: `/sources?type=${'whitepaper'}`,
		label: 'Whitepapers'
	}
]

const NavLinks: React.FC = () => {
	const router = useRouter()

	return (
		<nav className="flex items-center gap-6">
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
