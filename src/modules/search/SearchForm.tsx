import classNames from 'classnames'
import React, { ChangeEventHandler, useState } from 'react'

import { KbdSymbol } from '@/common/components/keyboard/KbdSymbol'
import { Spinner } from '@/common/components/spinner'
import { useDebouncedAndAutofocusedInput } from '@/common/hooks/useInput'
import { SearchIcon } from '@/icons/SearchIcon'
import styled from '@/styled'
import { colors } from '@/theme/foundations/colors'

const iconSize = 26
const iconColor = colors.blue[500]
const inputPlaceholder = 'Search docs'

const Left = styled.div`
	display: flex;
	align-items: center;
`

export interface SearchFormProps extends ReturnType<typeof useDebouncedAndAutofocusedInput> {
	isLoading: boolean
}

export function SearchForm({ value: initialQuery, setValue, isLoading }: SearchFormProps) {
	const [localQuery, setLocalQuery] = useState(initialQuery)

	const onChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
		setLocalQuery(value)
		setValue(value)
	}

	return (
		<form
			className={classNames(
				'flex items-center',
				'appearance-none',
				'w-full md:w-6/12',
				'mx-auto',
				'px-3 py-2',
				'rounded-lg',
				'bg-white',
				'shadow-sm',
				'border border-gray-300 focused:outline-none focused:ring-primary-500 focused:border-primary-500',
				'placeholder-gray-400',
				'text-base sm:text-sm'
			)}
			role="search"
			noValidate
		>
			<Left>
				{isLoading ? <Spinner /> : <SearchIcon height={iconSize} fill={iconColor} />}
				<input type="search" placeholder={inputPlaceholder} value={localQuery} onChange={onChange} />
			</Left>
			<KbdSymbol keys={['esc']} />
		</form>
	)
}
