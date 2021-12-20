import { useMountEffect } from '@react-hookz/web'
import { ChangeEventHandler, Dispatch, MutableRefObject, SetStateAction, useRef, useState } from 'react'

import { useFocus } from './useFocus'

export const useInput = (opts: { autoFocus: boolean }) => {
	const [value, setValue] = useState('')
	const inputFocus = useFocus()

	useMountEffect(() => opts.autoFocus && inputFocus.focus())

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setValue(event.currentTarget.value)
	}

	return { value, ...inputFocus, bind: { ...inputFocus.bind, onChange } }
}

export const useDebouncedAndAutofocusedInput = (): {
	value: string
	setValue: Dispatch<SetStateAction<string>>
	ref: MutableRefObject<HTMLInputElement | null>
	onChange: ChangeEventHandler<HTMLInputElement>
} => {
	const [value, setValue] = useState('')
	const inputRef = useRef<HTMLInputElement | null>(null)

	useMountEffect(() => inputRef.current?.focus())

	const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
		setValue(event.currentTarget.value)
	}

	return { value, setValue, ref: inputRef, onChange }
}
