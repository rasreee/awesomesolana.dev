import classNames from 'classnames'
import React, { InputHTMLAttributes } from 'react'

export interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: React.FunctionComponent<SearchInputProps> = (props) => {
	return (
		<input
			{...props}
			type="search"
			placeholder="Search for awesome Solana content"
			className={classNames(
				'px-3 py-2 flex flex-1 outline-none border-none',
				'placeholder:text-gray-500',
				'leading-tight',
				'align-middle'
			)}
		/>
	)
}
