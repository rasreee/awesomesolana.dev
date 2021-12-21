import { useMountEffect } from '@react-hookz/web'
import React, {
	ChangeEventHandler,
	Dispatch,
	forwardRef,
	InputHTMLAttributes,
	KeyboardEventHandler,
	Ref,
	SetStateAction,
	useRef,
	useState
} from 'react'

import { KbdSymbol } from '@/common/components/keyboard/KbdSymbol'
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
	onKeyDown: KeyboardEventHandler<HTMLInputElement>
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
					onKeyDown={props.onKeyDown}
				/>
				<KbdSymbol keys={['Escape']} />
			</S.Form>
		</S.Container>
	)
})

SearchBar.displayName = 'SearchBar'
