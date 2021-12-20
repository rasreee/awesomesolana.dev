import classNames from 'classnames'
import React, {
	ChangeEventHandler,
	Dispatch,
	forwardRef,
	InputHTMLAttributes,
	Ref,
	SetStateAction,
	useState
} from 'react'

import { KbdSymbol } from '@/common/components/keyboard/KbdSymbol'
import { Spinner } from '@/common/components/spinner'
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

export interface SearchFormProps extends InputHTMLAttributes<HTMLInputElement> {
	isLoading: boolean
	value: string
	setValue: Dispatch<SetStateAction<string>>
	/**
	 * The ref to the HTML DOM element.
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	ref?: Ref<any>
	onChange: ChangeEventHandler<HTMLInputElement>
}

export const SearchForm = forwardRef((props: SearchFormProps, ref: SearchFormProps['ref']) => {
	const [localQuery, setLocalQuery] = useState(props.value)

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		const newValue = event.currentTarget.value
		setLocalQuery(newValue)
		props.setValue(newValue)
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
				{props.isLoading ? <Spinner /> : <SearchIcon height={iconSize} fill={iconColor} />}
				<input ref={ref} type="search" placeholder={inputPlaceholder} value={localQuery} onChange={onChange} />
			</Left>
			<KbdSymbol keys={['esc']} />
		</form>
	)
})

SearchForm.displayName = 'SearchForm'
