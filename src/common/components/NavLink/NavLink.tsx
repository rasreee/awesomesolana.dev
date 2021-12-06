import classNames from 'classnames'
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'

import styled from '@/ui/styled'

export interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	id?: string
	label: string
	href: string
	isActive?: boolean
	children: React.ReactNode
}

const Underline = styled.div`
	flex: 1;
	height: 1px;
	background-color: ${(props) => props.theme.colors.white};
`

export function NavLink({ label, href, children, ...props }: NavLinkProps) {
	return (
		<label htmlFor={label}>
			<Link href={href}>
				<a
					className={classNames(
						'px-3 py-1',
						'text-gray-500 font-bold active:text-primary-500 hover:text-primary-500 hover:bg-primary-100',
						'rounded'
					)}
				>
					{children}
				</a>
			</Link>
			{props.isActive && <Underline />}
		</label>
	)
}
