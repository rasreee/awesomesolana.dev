import classNames from 'classnames'
import React, { ChangeEventHandler, useState } from 'react'

import { KbdSymbol } from '@/common/components/keyboard/KbdSymbol'
import { useDebouncedAndAutofocusedInput } from '@/common/hooks'
import styled from '@/common/utils/styled'
import { SearchIcon } from '@/icons/SearchIcon'
import { colors } from '@/theme/foundations/colors'

const iconSize = 26
const iconColor = colors.blue[500]
const inputPlaceholder = 'Search docs'

const Left = styled.div`
	display: flex;
	align-items: center;
`

export interface SearchFormProps extends ReturnType<typeof useDebouncedAndAutofocusedInput> {}

export function SearchForm({ value: initialQuery, setValue, isFocused }: SearchFormProps) {
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
				'border',
				isFocused ? 'outline-none ring-primary-500 border-primary-500' : 'border-gray-300',
				'placeholder-gray-400',
				'text-base sm:text-sm'
			)}
			role="search"
			noValidate
		>
			<Left>
				<SearchIcon height={iconSize} fill={iconColor} />
				<input type="search" placeholder={inputPlaceholder} value={localQuery} onChange={onChange} />
			</Left>
			<KbdSymbol keys={['esc']} />
		</form>
	)
}
