import classNames from 'classnames'
import React from 'react'

export interface TagProps {
	color?: string
}

export const Tag: React.FunctionComponent<TagProps> = ({ children, color = 'teal', ...props }) => {
	const bgClasses = `bg-${color}-100 active:bg-${color}-200`

	const txtColorClasses = `text-${color}-600 active:text-${color}-700`

	const borderColorClasses = `hover:border-${color}-300`

	return (
		<div
			className={classNames(
				'rounded px-2 py-0.5',
				'font-medium leading-tight',
				bgClasses,
				txtColorClasses,
				`hover:shadow-sm hover:border`,
				borderColorClasses,
				'cursor-pointer'
			)}
			{...props}
		>
			{children}
		</div>
	)
}
