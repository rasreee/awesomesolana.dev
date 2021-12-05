import { css } from '@emotion/react'
import Link from 'next/link'
import React, { HTMLAttributes } from 'react'

import { Anchor } from '@/ui/atoms'
import styled, { StyledProps } from '@/ui/styled'

export interface NavLinkProps extends HTMLAttributes<HTMLAnchorElement> {
	id?: string
	label: string
	href: string
	isActive?: boolean
	children: React.ReactNode
}

const activeStyle = ({ isActive = false, theme }: StyledProps & { isActive?: boolean }) =>
	isActive &&
	css`
		color: ${theme.colors.text};
		opacity: 1;
	`

const StyledAnchor = styled(Anchor)<Omit<NavLinkProps, 'label' | 'href'>>(activeStyle)

const Underline = styled.div`
	flex: 1;
	height: 1px;
	background-color: ${(props) => props.theme.colors.white};
`

export function NavLink({ label, href, children, ...props }: NavLinkProps) {
	return (
		<label htmlFor={label}>
			<Link href={href}>
				<StyledAnchor {...props}>{children}</StyledAnchor>
			</Link>
			{props.isActive && <Underline />}
		</label>
	)
}
