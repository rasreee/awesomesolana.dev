import { useRouter } from 'next/router'
import React from 'react'

import { NavLink, NavLinkProps } from '@/ui/components'

const navLinks: Omit<NavLinkProps, 'children'>[] = [
	{
		id: 'articles',
		href: '/articles',
		label: 'Articles'
	},
	{
		id: 'repos',
		href: '/repos',
		label: 'Repos'
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
