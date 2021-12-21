import classNames from 'classnames'
import React, { HTMLAttributes, PropsWithChildren } from 'react'

export interface SidebarProps {}

export const Sidebar = ({ children }: PropsWithChildren<SidebarProps>) => {
	return <aside className="px-5 flex flex-col gap-5">{children}</aside>
}

Sidebar.Header = function Header({ children }: PropsWithChildren<{}>) {
	return <header>{children}</header>
}

Sidebar.Body = function Body({ children }: PropsWithChildren<{}>) {
	return <div>{children}</div>
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
