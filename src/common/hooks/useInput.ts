import { useMountEffect } from '@react-hookz/web'
import { ChangeEventHandler, useState } from 'react'

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
