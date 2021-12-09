import React, { ChangeEventHandler, useState } from 'react'

import { KeyComboSymbol } from '@/common/components/KeyComboSymbol'
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

const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
`

export interface SearchFormProps {
	query: string
	onQueryChange: (val: string) => void
}

export function SearchForm({ query: initialQuery, onQueryChange }: SearchFormProps) {
	const [localQuery, setLocalQuery] = useState(initialQuery)

	const onChange: ChangeEventHandler<HTMLInputElement> = ({ currentTarget: { value } }) => {
		setLocalQuery(value)
		onQueryChange(value)
	}

	return (
		<Form role="search" noValidate>
			<Left>
				<SearchIcon height={iconSize} fill={iconColor} />
				<input type="search" placeholder={inputPlaceholder} value={localQuery} onChange={onChange} />
			</Left>
			<KeyComboSymbol keys={['esc']} />
		</Form>
	)
}
