import { css } from '@emotion/react'
import classNames from 'classnames'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

export interface SidebarProps {}

export const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
	return (
		<aside
			className={classNames('absolute left-0', 'px-5 flex flex-col gap-5')}
			css={css`
				width: var(--page-sidebar-width);
				max-width: var(--page-sidebar-width);
			`}
		>
			{children}
		</aside>
	)
}

Sidebar.Section = function Section({ children }: PropsWithChildren<{}>) {
	return <div className="">{children}</div>
}

Sidebar.SectionHeader = function SectionHeader({ children }: PropsWithChildren<{}>) {
	return <div className="px-2 py-2 flex items-center justify-between h-12 min-h-[3rem] max-h-[3rem]">{children}</div>
}

Sidebar.SectionTitle = function SectionTitle({ children }: PropsWithChildren<{}>) {
	return <div className="font-bold text-base">{children}</div>
}

Sidebar.List = function List({ children }: PropsWithChildren<{}>) {
	return <ul className="flex flex-col gap-2">{children}</ul>
}

type SidebarListItemProps = HTMLAttributes<HTMLLIElement> & { isActive: boolean; onClick: () => void }

Sidebar.ListItem = function ListItem({
	children,
	isActive,
	onClick,
	...props
}: PropsWithChildren<SidebarListItemProps>) {
	return (
		<li {...props}>
			<button
				className={classNames(
					'text-base font-semibold text-gray-700',
					'rounded-md px-2',
					isActive && 'bg-primary-400 text-white'
				)}
				onClick={onClick}
			>
				{children}
			</button>
		</li>
	)
}
