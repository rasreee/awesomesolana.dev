import { useMountEffect } from '@react-hookz/web'
import React, { ChangeEventHandler, Dispatch, forwardRef, Ref, SetStateAction, useRef, useState } from 'react'

import { KbdSymbol } from '@/common/components/keyboard/KbdSymbol'
import { EventKeys } from '@/common/components/keyboard/keys'
import { Spinner } from '@/common/components/spinner'
import { SearchIcon } from '@/icons/SearchIcon'
import { colors } from '@/theme/foundations/colors'

import * as S from './SearchBar.styles'

const iconSize = 26
const iconColor = colors.blue[500]

export interface SearchBarProps {
	isLoading: boolean
	value: string
	setValue: Dispatch<SetStateAction<string>>
	ref?: Ref<any>
	onChange: ChangeEventHandler<HTMLInputElement>
	onSubmitQuery: (query: string) => void
}

export const SearchBar = forwardRef((props: SearchBarProps, ref: SearchBarProps['ref']) => {
	const [localQuery, setLocalQuery] = useState(props.value)

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const newValue = event.currentTarget.value
		setLocalQuery(newValue)
		props.setValue(newValue)
	}

	const inputRef = useRef<HTMLInputElement | null>(null)

	useMountEffect(() => inputRef.current?.focus())

	const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
		if (event.code === EventKeys.Enter) {
			props.onSubmitQuery(localQuery)
		}
	}

	return (
		<S.Container ref={ref}>
			<S.Form role="search" noValidate>
				<S.Label>{props.isLoading ? <Spinner /> : <SearchIcon height={iconSize} fill={iconColor} />}</S.Label>
				<S.Input
					ref={inputRef}
					type="search"
					placeholder="Search"
					value={localQuery}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
				<KbdSymbol keys={['Escape']} />
			</S.Form>
		</S.Container>
	)
})

SearchBar.displayName = 'SearchBar'
