import classNames from 'classnames'
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'

export interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	id?: string
	label: string
	href: string
	isActive?: boolean
	children: React.ReactNode
}

export function NavLink({ label, href, children, isActive = false, ...props }: NavLinkProps) {
	return (
		<label htmlFor={label}>
			<Link href={href}>
				<a
					className={classNames(
						'px-3 py-4',
						isActive ? 'text-primary-500' : 'text-gray-500',
						'flex items-center',
						'leading-tight',
						'font-bold active:text-primary-500 hover:text-primary-500 hover:bg-primary-100',
						'rounded'
					)}
					{...props}
				>
					{children}
				</a>
			</Link>
		</label>
	)
}
